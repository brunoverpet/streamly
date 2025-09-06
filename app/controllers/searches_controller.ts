import { inject } from '@adonisjs/core'
import { TMDBService } from '#services/tmdb_service'
import { HttpContext } from '@adonisjs/core/http'
import WatchedItem from '#models/watched_item'

@inject()
export default class SearchesController {
  constructor(private tmdbService: TMDBService) {}

  async searchItem({ auth, request, response }: HttpContext) {
    const query = request.input('query')

    const result = await this.tmdbService.searchItem(query)

    // Récupère les idTmdb déjà vus
    const userHistoryIds = await WatchedItem.query()
      .where('user_id', auth.user!.id)
      .select('id_tmdb')

    // Placer en string pour comparer correctement
    const ids = userHistoryIds.map((item) => item.idTmdb)

    // Ajoute seen à chaque film
    const resultsWithSeen = result.results.map((item) => {
      const isSeen = ids.includes(item.id.toString())
      return {
        ...item,
        seen: isSeen,
      }
    })

    return response.ok({ ...result, results: resultsWithSeen })
  }
}
