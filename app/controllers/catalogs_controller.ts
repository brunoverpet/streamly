import type { HttpContext } from '@adonisjs/core/http'
import { CatalogService } from '#services/catalog_service'
import { inject } from '@adonisjs/core'

@inject()
export default class CatalogsController {
  constructor(private catalogsService: CatalogService) {}

  async getCatalogs({}: HttpContext) {
    return this.catalogsService.getCatalogs()
  }
}
