import {neon} from '@neondatabase/serverless'
const sql = neon(process.env.DATABASE_URL)

// console.log(sql`SELECT NOW()`)

export async function helloWorld() {
    const start = new Date()
    const [dbResponse] = await sql`SELECT NOW();`
    const dbNow = dbResponse && dbResponse.now ? dbResponse.now : ""
    const end = new Date()
    return {dbNow: dbNow, latency: Math.abs(end-start)}
}

async function configureDatabase() {
    const dbResponse = await sql`CREATE TABLE IF NOT EXISTS "links" (
        "id" serial PRIMARY KEY NOT NULL,
        "url" text NOT NULL,
        "short" varchar(50),
        "created_at" timestamp DEFAULT now()
    );`    
}

configureDatabase().catch(err=>console.log("db config err", err))