import { inject } from '@adonisjs/core'
import { TMDBService } from '#services/tmdb_service'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SearchesController {
  constructor(private tmdbService: TMDBService) {}

  async searchItem({ request, response }: HttpContext) {
    const query = request.qs()

    const result = await this.tmdbService.searchItem(query.query)
    return response.ok({ result })
  }
}
