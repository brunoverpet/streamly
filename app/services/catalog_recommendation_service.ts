import { WatchedItemService } from '#services/watched_items_service'
import { inject } from '@adonisjs/core'
import { SingleItemFromTMDB } from '../interfaces/catalog_item.js'
import WatchedItem from '#models/watched_item'

@inject()
export class CatalogRecommendationService {
  constructor(private watchedMovieService: WatchedItemService) {}

  async test() {
    const tmdbItem: SingleItemFromTMDB = {
      id: '123',
      title: 'Movie TMDB',
      backdrop_path: '/image.jpg',
      release_date: '2025-01-01',
      vote_average: 8.5,
      genres: [
        { id: 28, name: 'Action' }, // match avec Logan
        { id: 18, name: 'Drama' }, // match avec Logan
        { id: 10749, name: 'Romance' }, // bonus, pas dans Logan
      ],
      production_companies: [
        {
          id: 91797,
          logo_path: '/logo.png',
          name: 'Hutch Parker Entertainment',
          origin_country: 'US',
        }, // match avec Logan
        { id: 99999, logo_path: '/logo.png', name: 'Fake Studio', origin_country: 'US' }, // pas match
      ],
      keywords: {
        keywords: [
          { id: 2964, name: 'future' }, // match avec Logan
          { id: 9999, name: 'time travel' }, // pas match
        ],
      },
      credits: {
        cast: [
          { id: 6968, name: 'Hugh Jackman', known_for_department: 'Acting' }, // match
          { id: 9999, name: 'Fake Actor', known_for_department: 'Acting' }, // pas match
        ],
        crew: [
          { id: 10, name: 'James Mangold', job: 'Director' }, // match avec Logan
        ],
      },
    }

    const watchedItems = await this.watchedMovieService.getWatchedMovie()
    for (const watchedItem of watchedItems) {
      console.log(`Watched Item ${watchedItem.title}`)
      this.evaluateCatalogMatch(tmdbItem, watchedItem)
    }
  }

  private evaluateCatalogMatch(item1: SingleItemFromTMDB, item2: WatchedItem) {
    let score = 0

    //#region ACTORS
    for (const actor of item1.credits.cast) {
      if (item2.actors.some((actor2) => actor2.name === actor.name)) {
        score += 3
      } else {
        console.log('pas d acteur en commun')
      }
    }
    //#endregion

    //#region DIRECTOR
    const directorName = item1.credits.crew.find((c) => c.job === 'Director')?.name
    if (directorName && directorName === item2.director) {
      score += 2
    } else {
      console.log('pas de directeur en commun')
    }
    //#endregion

    //#region PRODUCTION
    for (const company of item1.production_companies) {
      if (item2.production_company.some((prod) => prod.name === company.name)) {
        score += 1
      } else {
        console.log('pas de production en commun')
      }
    }
    //#endregion

    //#region GENRES
    for (const itemGenre of item1.genres) {
      if (item2.genres.some((genre) => genre.name === itemGenre.name)) {
        score += 1
      } else {
        console.log('pas de genres en commun')
      }
    }
    //#endregion

    //#region KEYWORDS
    for (const key of item1.keywords.keywords) {
      if (item2.keywords.some((keyword) => keyword.name === key.name)) {
        score += 0.5
      }
      console.log('pas de keywords en commun')
    }
    //#endregion

    //#region VOTE_AVERAGE
    if (item1.vote_average >= 5) {
      score += 0.5
    } else {
      console.log('pas de point en plus pour le vote')
    }
    //#endregion

    console.log(score)
    return score
  }
}
