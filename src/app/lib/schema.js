import { relations } from 'drizzle-orm'
import { uniqueIndex, timestamp, text, pgTable, serial, varchar, integer} from 'drizzle-orm/pg-core'


export const LinksTable = pgTable("links", {
    id: serial('id').primaryKey().notNull(),
    url: text("url").notNull(), 
    short: varchar("short", {length: 50}),
    createdAt: timestamp("created_at").defaultNow()
}, (links)=>{
    return {
        urlIndex: uniqueIndex("url_idx").on(links.url)
    }
})

// links --> link -> has many visits

export const LinksTableRelations = relations(LinksTable, ({many, one})=>({
    visits: many(VisitsTable)
}))

export const VisitsTable = pgTable("visits", {
    id: serial('id').primaryKey().notNull(),
    linkId: integer('link_id').notNull().references(()=>LinksTable.id),
    createdAt: timestamp("created_at").defaultNow()
})

// visits --> visit -> one link
export const VisitsTableRelations = relations(VisitsTable, ({many, one})=>({
    link: one(LinksTable, {
        fields: [VisitsTable.linkId],
        references: [LinksTable.id]
    })
}))