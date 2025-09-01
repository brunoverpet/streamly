import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { Actor, Genre, Keyword, ProductionCompanies } from '../interfaces/catalog_item.js'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class WatchedItem extends BaseModel {
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

  @column({ prepare: (value) => JSON.stringify(value) })
  declare genres: Genre[]

  @column({ prepare: (value) => JSON.stringify(value) })
  declare production_company: ProductionCompanies[]

  @column({ prepare: (value) => JSON.stringify(value) })
  declare keywords: Keyword[]

  @column({ prepare: (value) => JSON.stringify(value) })
  declare actors: Actor[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
