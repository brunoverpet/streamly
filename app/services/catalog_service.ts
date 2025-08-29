import { inject } from '@adonisjs/core'
import { TmdbService } from '#services/tmdb_service'

@inject()
export class CatalogService {
  constructor(private tmdbService: TmdbService) {}

  async getMoviesCatalogs() {
    return await this.tmdbService.getAllItems('movie')
  }

  async getCatalogItem(id: string) {
    const item = await this.tmdbService.getItem(id, 'movie')
    if (!item) return null
    return item
  }
}
