import { WatchedItemService } from '#services/watched_items_service'
import { inject } from '@adonisjs/core'
import { SingleItemFromTMDB } from '../interfaces/catalog_item.js'
import WatchedItem from '#models/watched_item'
import { TMDBService } from '#services/tmdb_service'

@inject()
export class CatalogRecommendationService {
  constructor(
    private watchedMovieService: WatchedItemService,
    private tmdbService: TMDBService
  ) {}

  async recommandations() {
    const watchedItems = await this.watchedMovieService.getWatchedMovie()
    const allItems = await this.tmdbService.getAllItems('movie')

    if (watchedItems.length === 0) return allItems

    const filteredItems = allItems.filter(
      (tmdbItem) => !watchedItems.some((watched) => watched.idTmdb === tmdbItem.id.toString())
    )

    const results: any[] = []

    for (const tmdbItem of filteredItems) {
      const item = await this.tmdbService.getItem(tmdbItem.id, 'movie')

      let totalScore = 0
      for (const watchedItem of watchedItems) {
        totalScore += this.evaluateCatalogMatch(item, watchedItem).score
      }

      results.push({ ...item, score: totalScore })
    }

    return this.getBestItems(results) // Top 10 par exemple
  }

  // async recommandations1() {
  //   const watchedItems = await this.watchedMovieService.getWatchedMovie()
  //   const allItems = await this.tmdbService.getAllItems('movie')
  //
  //   if (watchedItems.length === 0) {
  //     return allItems
  //   }
  //
  //   // Filtrer les films déjà vus
  //   const filteredItems = allItems.filter(
  //     (tmdbItem) => !watchedItems.some((watched) => watched.idTmdb === tmdbItem.id.toString())
  //   )
  //
  //   const results: any[] = []
  //
  //   for (const tmdbItem of filteredItems) {
  //     const item = await this.tmdbService.getItem(tmdbItem.id, 'movie')
  //
  //     // Calculer le score par rapport à tous les films vus
  //     let totalScore = 0
  //     for (const watchedItem of watchedItems) {
  //       totalScore += this.evaluateCatalogMatch(item, watchedItem).score
  //     }
  //
  //     results.push({ ...item, score: totalScore })
  //   }
  //
  //   // for (const watchedItem of watchedItems) {
  //   //   const watchedResult = {
  //   //     watchedItem: watchedItem.title,
  //   //     comparisons: [] as any[],
  //   //   }
  //   //
  //   //   for (const tmdbItem of filteredItems) {
  //   //     const item = await this.tmdbService.getItem(tmdbItem.id, 'movie')
  //   //
  //   //     const score = this.evaluateCatalogMatch(item, watchedItem)
  //   //
  //   //     watchedResult.comparisons.push({
  //   //       comparedWith: item.title,
  //   //       id: item.id,
  //   //       score,
  //   //     })
  //   //   }
  //   //   watchedResult.comparisons.sort((a, b) => b.score.score - a.score.score)
  //   //   results.push(watchedResult)
  //   // }
  //
  //   return this.getBestItems(results)
  // }

  private evaluateCatalogMatch(item1: SingleItemFromTMDB, item2: WatchedItem) {
    let score = 0
    const reasons: string[] = []

    //#region ACTORS
    for (const actor of item1.credits.cast) {
      if (item2.actors.some((actor2) => actor2.name === actor.name)) {
        reasons.push(`Acteur en commun: ${actor.name}`)
        score += 3
      }
    }
    //#endregion

    //#region DIRECTOR
    const directorName = item1.credits.crew.find((c) => c.job === 'Director')?.name
    if (directorName && directorName === item2.director) {
      score += 2
      reasons.push(`Réalisateur en commun: ${directorName}`)
    }
    //#endregion

    //#region PRODUCTION
    for (const company of item1.production_companies) {
      if (item2.production_company.some((prod) => prod.name === company.name)) {
        reasons.push(`Prod en commun: ${company.name}`)
        score += 1
      }
    }
    //#endregion

    //#region GENRES
    for (const itemGenre of item1.genres) {
      if (item2.genres.some((genre) => genre.name === itemGenre.name)) {
        score += 1
        reasons.push(`Genre en commun: ${itemGenre.name}`)
      }
    }
    //#endregion

    //#region KEYWORDS
    for (const key of item1.keywords.keywords) {
      if (item2.keywords.some((keyword) => keyword.name === key.name)) {
        score += 0.5
        reasons.push(`Keyword en commun: ${key.name}`)
      }
    }
    //#endregion

    //#region VOTE_AVERAGE
    if (item1.vote_average >= 5) {
      score += 0.5
      reasons.push(`Vote average supérieur à 5`)
    }
    //#endregion

    return {
      score,
      reasons,
    }
  }

  private getBestItems(items: any[], top = 10) {
    // On trie par score décroissant
    const sortedItems = items.sort((a, b) => b.score - a.score)

    // On retourne les top N
    return sortedItems.slice(0, top)
  }

  // private getBestItems2(results: { watchedItem: string; comparisons: any[] }[]) {
  //   const bestItemsSelected: { watchedItem: string; bestComparisons: any[] }[] = []
  //
  //   for (const result of results) {
  //     // On enlève les items déjà sélectionnés
  //     const availableItems = result.comparisons.filter(
  //       (item) =>
  //         !bestItemsSelected.some((selected) =>
  //           selected.bestComparisons.some((i) => i.id === item.id)
  //         )
  //     )
  //
  //     // On prend les deux meilleurs parmi les disponibles
  //     const top2 = availableItems.slice(0, 2)
  //
  //     if (top2.length > 0) {
  //       bestItemsSelected.push({
  //         watchedItem: result.watchedItem,
  //         bestComparisons: top2,
  //       })
  //     }
  //   }
  //
  //   return bestItemsSelected
  // }
}
