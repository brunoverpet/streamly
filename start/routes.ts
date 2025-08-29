/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const CatalogRecommendationsController = () =>
  import('#controllers/catalog_recommendations_controller')

const WatchedItemsController = () => import('#controllers/watched_items_controller')

router.get('/', [WatchedItemsController, 'getWatchedItems'])

router.post('addWatchedItem/:id', [WatchedItemsController, 'addItemToWatched'])

router.get('recommendations', [CatalogRecommendationsController, 'getRecommandations'])
