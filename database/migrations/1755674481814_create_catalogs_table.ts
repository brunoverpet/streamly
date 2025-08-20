import { BaseSchema } from '@adonisjs/lucid/schema'
import { GENRES } from '../../app/enums/genres.js'

export default class extends BaseSchema {
  protected tableName = 'catalogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.enu('type', ['movie', 'series'], {
        useNative: true,
        enumName: 'type_catalog',
      })
      table
        .enu('genre', GENRES, {
          useNative: true,
          enumName: 'movie_genre',
          existingType: true,
        })
        .notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "movie_genre"')
  }
}
