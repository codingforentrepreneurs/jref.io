import {drizzle} from 'drizzle-orm/neon-http'
import {neon, neonConfig} from '@neondatabase/serverless'
import { UsersTable, LinksTable, VisitsTable } from './schema';
import { desc, eq, sql as sqld } from 'drizzle-orm';
import randomShortStrings from './randomShortStrings';
import * as schema from './schema'
import { getSessionUser } from './session';
import { hashPassword } from './passwordUtils';
const sql = neon(process.env.DATABASE_URL)
neonConfig.fetchConnectionCache = true;
const db = drizzle(sql, {schema})


export async function helloWorld() {
    const start = new Date()
    const [dbResponse] = await sql`SELECT NOW();`
    const dbNow = dbResponse && dbResponse.now ? dbResponse.now : ""
    const end = new Date()
    return {dbNow: dbNow, latency: Math.abs(end-start)}
}

async function configureDatabase() {
    sql`CREATE TABLE IF NOT EXISTS "links" (
        "id" serial PRIMARY KEY NOT NULL,
        "url" text NOT NULL,
        "short" varchar(50),
        "user_id" integer,
        "created_at" timestamp DEFAULT now()
    );`
    sql`CREATE TABLE IF NOT EXISTS "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "username" varchar(50) NOT NULL,
        "password" text NOT NULL,
        "email" text,
        "created_at" timestamp DEFAULT now()
    );`
    sql`CREATE TABLE IF NOT EXISTS "visits" (
        "id" serial PRIMARY KEY NOT NULL,
        "link_id" integer NOT NULL,
        "created_at" timestamp DEFAULT now()
    );`

    sql`CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "users" ("username");`
    
    sql`DO $$ BEGIN
     ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;`

    sql`DO $$ BEGIN
     ALTER TABLE "visits" ADD CONSTRAINT "visits_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE no action ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;`
}

configureDatabase().catch(err=>console.log("db config err", err))


export async function addLink(url) {
    const short = randomShortStrings()
    const user = await getSessionUser()
    const newLink = {url: url, short:short}
    if (user) {
        newLink["userId"] = user
    }
    let response= {message: `${url} is not valid. Please try again`}
    let responseStatus = 400
    try {
        response = await db.insert(LinksTable).values(newLink).returning()
        responseStatus = 201
    } catch ({name, message}) {
        if (`${message}`.includes("duplicate key value violates unique constraint")) {
            response ={message: `${url} is has already been added.`}
        }
    }
    return {data: response, status: responseStatus}
}


export async function registerUser(newUserData) {
    const {username} = newUserData
    const toInsertData = {
        username: username,
        password: await hashPassword(newUserData.password)
    }
    if (newUserData.email) {
        toInsertData['email'] = newUserData.email
    }

    let response= {message: `Failed to register. Please try again.`}
    let responseStatus = 400
    try {
        let dbResponse = await db.insert(UsersTable).values(toInsertData).returning()
        let dbResponseData = dbResponse[0]
        response = [{
            id: dbResponseData.id,
            username: dbResponseData.username,
            createdAt: dbResponseData.createdAt
        }]
        responseStatus = 201
    } catch ({name, message}) {
        if (`${message}`.includes("duplicate key value violates unique constraint")) {
            response = {message: `${username} is taken.`}
        }
    }
    return {data: response, status: responseStatus}
}

export async function getUserByUsername(username) {
    return await db.select().from(UsersTable).where(eq(UsersTable.username, username))
}

export async function getLinks(limit, offset) {
    const lookupLimit = limit ? limit : 10
    const lookupOffset = offset ? offset : 0
    return await db.select().from(LinksTable).limit(lookupLimit).offset(lookupOffset)
}

export async function getShortLinkRecord(shortSlugValue) {
    return await db.select().from(LinksTable).where(eq(LinksTable.short, shortSlugValue))
}

export async function saveLinkVisit(linkIdValue) {
    return await db.insert(VisitsTable).values({linkId:linkIdValue})
}

export async function getMinLinks(limit, offset) {
    const lookupLimit = limit ? limit : 10
    const lookupOffset = offset ? offset : 0
    const sessionUser = await getSessionUser()
    return await db.select({
        id: LinksTable.id,
        url: LinksTable.url,
        timestamp: LinksTable.createdAt,
    }).from(LinksTable).limit(lookupLimit).offset(lookupOffset).orderBy(desc(LinksTable.createdAt)).where(eq(LinksTable.userId, sessionUser))
}

export async function getMinLinksAndVisits(limit, offset) {
    const lookupLimit = limit ? limit : 10
    const lookupOffset = offset ? offset : 0
    const sessionUser = await getSessionUser()
    // return await db.select({
    //     id: LinksTable.id,
    //     url: LinksTable.url,
    //     timestamp: LinksTable.createdAt,
    // }).from(LinksTable).limit(lookupLimit).offset(lookupOffset).orderBy(desc(LinksTable.createdAt))
    return await db.query.LinksTable.findMany({
        limit: lookupLimit,
        offset: lookupOffset,
        orderBy: [desc(LinksTable.createdAt)],
        columns: {
            id: true,
            url: true,
            short: true,
            createdAt: true,
            userId: true,
        },
        where: eq(LinksTable.userId, sessionUser),
        with: {
            visits: {
                // limit: 5,
                columns: {
                    createdAt: true,
                }
               
            }
        },
        extras: {
            count: sqld`count(${VisitsTable.id})`.as('count')
        }
       
    })
}