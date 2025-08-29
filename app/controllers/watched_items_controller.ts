import type { HttpContext } from '@adonisjs/core/http'
import { WatchedItemService } from '#services/watched_items_service'
import { inject } from '@adonisjs/core'

@inject()
export default class WatchedItemsController {
  constructor(private watchedItemService: WatchedItemService) {}

  async addItemToWatched({ params, response }: HttpContext) {
    const itemId: string = params.id
    const addItem = await this.watchedItemService.addWatchedItem(itemId)
    if (!addItem)
      return response.badGateway({ message: 'An error occurred while adding the catalog item ' })

    return response.ok({ message: 'Item added successfully' })
  }
}
