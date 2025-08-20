import { BaseSchema } from '@adonisjs/lucid/schema'
import { GENRES } from '../../app/enums/genres.js'

export default class extends BaseSchema {
  protected tableName = 'watched_movies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.enu('genre', GENRES, {
        useNative : true,
        enumName : 'movie_genre'
      }).notNullable()
      table.float('rating')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "movie_genres"')
  }
}
