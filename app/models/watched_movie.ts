import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class WatchedMovie extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare idTmdb: string

  @column()
  declare title: string

  @column()
  declare coverUrl: string

  @column()
  declare director: string

  @column()
  declare genres: object[]

  @column()
  declare keywords: object[]

  @column()
  declare actors: object[]

  @column()
  declare rating: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
