import { CatalogService } from '#services/catalog_service'
import { WatchedMovieService } from '#services/watched_items_service'
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

    const recommendations = catalog.map((catalogMovie) => {
      // On calcule un score basé sur le nombre de genres en commun
      let score = 0

      for (const watchedMovie of watched) {
        if (catalogMovie.genre === watchedMovie.genre) {
          score += 1
        }
        // Ici, tu peux ajouter d'autres critères : tags, notes, contenu...
      }
      return { movie: catalogMovie, score }
    })

    // On trie les films par score décroissant
    recommendations.sort((a, b) => b.score - a.score)

    // On renvoie les X premiers
    const topRecommendations = recommendations.slice(0, 5)

    return topRecommendations.map((r) => r.movie)
  }
}
