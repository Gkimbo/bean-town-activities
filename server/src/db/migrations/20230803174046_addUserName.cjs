/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("users", (table) => {
        table.string("userName").unique().notNullable()
        table.string("name").notNullable()
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("users", (table)=> {
        table.dropColumn("userName")
        table.dropColumn("name")
    })
}
