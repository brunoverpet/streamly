import { BaseSchema } from '@adonisjs/lucid/schema'
import { GENRES } from '../../app/enums/genres.js'

export default class extends BaseSchema {
  protected tableName = 'watched_movies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.enum('genres', GENRES)
      table.float('rating')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
