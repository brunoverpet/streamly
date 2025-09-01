import type { HttpContext } from '@adonisjs/core/http'
import { WatchedItemService } from '#services/watched_items_service'
import { inject } from '@adonisjs/core'

@inject()
export default class WatchedItemsController {
  constructor(private watchedItemService: WatchedItemService) {}

  async getWatchedItems({}: HttpContext) {
    return await this.watchedItemService.getWatchedMovie()
  }

  async addItemToWatched({ auth, params, response }: HttpContext) {
    const itemId: string = params.id
    const userId = auth.user?.id.toString()

    if (!userId)
      return response.unauthorized({
        message: 'Vous devez être connecté pour ajouter un film aux visionnés.',
      })

    const addItem = await this.watchedItemService.addWatchedItem(itemId, userId)
    if (!addItem)
      return response.badGateway({ message: 'An error occurred while adding the catalog item ' })

    return response.ok({ message: 'Item added successfully' })
  }

  async deleteWatchedItem({ params, response }: HttpContext) {
    const id: string = params.id
    const itemDeleted = await this.watchedItemService.deleteWatchedItem(id)

    if (!itemDeleted)
      return response.badRequest({ message: 'An error occurred while deleting item' })
    return response.ok({ message: 'Item deleted successfully' })
  }
}
