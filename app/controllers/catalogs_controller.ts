import type { HttpContext } from '@adonisjs/core/http'
import { CatalogService } from '#services/catalog_service'
import { inject } from '@adonisjs/core'

@inject()
export default class CatalogsController {
  constructor(private catalogsService: CatalogService) {}

  async getCatalogs({}: HttpContext) {
    return this.catalogsService.getMoviesCatalogs()
  }

  async getCatalogItem({ params, response }: HttpContext) {
    const itemId = params.id
    const item = await this.catalogsService.getCatalogItem(itemId)

    if (!item) return response.notFound({ message: `Item ${itemId} not found` })
    return item
  }
}
