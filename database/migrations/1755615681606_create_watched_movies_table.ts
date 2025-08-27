import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'watched_movies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('id_tmdb').notNullable().unique()
      table.string('title').notNullable()
      table.string('cover_url').notNullable()
      table.string('director').notNullable()
      table.jsonb('genres').notNullable()
      table.jsonb('keywords').nullable()
      table.jsonb('actors').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
