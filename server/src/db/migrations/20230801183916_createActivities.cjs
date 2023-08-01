/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("activities", (table) => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.string("description")
        table.bigInteger("categoryId").references("categories.id").index().unsigned().notNullable()
        table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable()
        table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable()
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTable("activities")
}
