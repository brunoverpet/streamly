import type { HttpContext } from '@adonisjs/core/http'
import { CatalogRecommendationService } from '#services/catalog_recommendation_service'
import { inject } from '@adonisjs/core'

@inject()
export default class CatalogRecommendationsController {
  constructor(private catalogRecommandationService: CatalogRecommendationService) {}

  async getRecommandations({}: HttpContext) {
    return this.catalogRecommandationService.test()
  }
}
