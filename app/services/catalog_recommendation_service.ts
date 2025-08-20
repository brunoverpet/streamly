import { CatalogService } from '#services/catalog_service'
import { WatchedMovieService } from '#services/watched_movie_service'
import { inject } from '@adonisjs/core'

@inject()
export class CatalogRecommendationService {
  constructor(
    private catalogService: CatalogService,
    private watchedMovieService: WatchedMovieService
  ) {}

  async getRecommendations() {
    const watched = await this.watchedMovieService.getWatchedMovie()
    const catalog = await this.catalogService.getCatalog()
  }
}
