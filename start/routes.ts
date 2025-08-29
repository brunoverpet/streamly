/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import WatchedMovie from '#models/watched_item'
const WatchedItemsController = () => import('#controllers/watched_items_controller')

const CatalogsController = () => import('#controllers/catalogs_controller')

const CatalogRecommendationsController = () =>
  import('#controllers/catalog_recommendations_controller')

router.get('/', async () => {
  const watchedMovies = await WatchedMovie.all()
  return {
    watchedMovies,
  }
})

router.get('catalogs', [CatalogsController, 'getCatalogs'])
router.get('catalogs/:id', [CatalogsController, 'getCatalogItem'])

router.post('addWatchedItem/:id', [WatchedItemsController, 'addItemToWatched'])

router.get('/catalogs/recommendations', [CatalogRecommendationsController, 'getRecommandations'])
