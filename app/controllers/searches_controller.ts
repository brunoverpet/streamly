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

    const userHistory = await WatchedItem.query()
      .where('user_id', auth.user!.id)
      .select('id_tmdb', 'id')

    const historyMap = new Map(userHistory.map((item) => [item.idTmdb, item.id]))

    const resultsWithSeen = result.results.map((item) => {
      const idTmdbStr = item.id.toString()
      const watchedId = historyMap.get(idTmdbStr) || null
      return {
        ...item,
        seen: watchedId !== null,
        watched_id: watchedId,
      }
    })

    return response.ok({ ...result, results: resultsWithSeen })
  }
}
