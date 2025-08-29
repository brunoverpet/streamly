import { inject } from '@adonisjs/core'
import { CatalogService } from '#services/catalog_service'
import { SingleItemFromTMDB } from '../interfaces/catalog_item.js'
import WatchedItem from '#models/watched_item'

@inject()
export class WatchedItemService {
  constructor(private catalogService: CatalogService) {}

  async getWatchedMovie() {
    return await WatchedItem.all()
  }

  async addWatchedItem(id: string) {
    const item: SingleItemFromTMDB | null = await this.catalogService.getCatalogItem(id)
    if (!item) return null

    const createItem = await WatchedItem.create({
      idTmdb: item.id,
      title: item.title,
      coverUrl: item.backdrop_path,
      director: item.credits.crew.find((director) => director.job === 'Director')?.name,
      genres:
        item.genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
        })) || [],
      keywords: item.keywords.keywords?.map((word) => ({ id: word.id, name: word.name })) || [],
      actors:
        item.credits.cast.slice(0, 3).map((actor) => ({
          id: actor.id,
          name: actor.name,
        })) || [],
    })

    if (!createItem) return null

    return createItem
  }
}
