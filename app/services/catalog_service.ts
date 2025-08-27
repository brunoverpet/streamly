import { inject } from '@adonisjs/core'
import { TmdbService } from '#services/tmdb_service'

@inject()
export class CatalogService {
  constructor(private tmdbService: TmdbService) {}

  async getCatalogs() {
    return await this.tmdbService.getAllMovies()
  }
}
