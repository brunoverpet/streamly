import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'watched_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('id_tmdb').notNullable().unique()
      table.string('title').notNullable()
      table.text('synopsys').notNullable()
      table.string('runtime').notNullable()
      table.string('release_date').notNullable()
      table.string('backdrop_path').notNullable()
      table.string('director').notNullable()
      table.jsonb('genres').notNullable()
      table.jsonb('production_company').notNullable()
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
