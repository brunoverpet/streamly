import Catalog from '#models/catalog'

export class CatalogService {
  async getCatalog() {
    return await Catalog.all()
  }
}
