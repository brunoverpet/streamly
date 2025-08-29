import { inject } from '@adonisjs/core'
import { TMDBService } from '#services/tmdb_service'

@inject()
export class CatalogService {
  constructor(private tmdbService: TMDBService) {}

  async getCatalogItem(id: string) {
    const item = await this.tmdbService.getItem(id, 'movie')
    if (!item) return null
    return item
  }
}
