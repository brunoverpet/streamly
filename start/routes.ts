/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const SearchesController = () => import('#controllers/searches_controller')

const CatalogRecommendationsController = () =>
  import('#controllers/catalog_recommendations_controller')

const WatchedItemsController = () => import('#controllers/watched_items_controller')

router.get('/', [WatchedItemsController, 'getWatchedItems'])

router.post('addWatchedItem/:id', [WatchedItemsController, 'addItemToWatched'])
router.delete('removeWatchedItem/:id', [WatchedItemsController, 'deleteWatchedItem'])

router.get('searchItem', [SearchesController, 'searchItem'])

router.get('recommendations', [CatalogRecommendationsController, 'getRecommandations'])
