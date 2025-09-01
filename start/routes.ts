/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')

const SearchesController = () => import('#controllers/searches_controller')

const CatalogRecommendationsController = () =>
  import('#controllers/catalog_recommendations_controller')

const WatchedItemsController = () => import('#controllers/watched_items_controller')

//#region AUTH
router.post('register', [AuthController, 'register'])
router.post('login', [AuthController, 'login'])

router.delete('logout', [AuthController, 'logout']).use(middleware.auth())
//#endregion

router
  .group(() => {
    //#region WatchedItem
    router.get('/watched', [WatchedItemsController, 'getWatchedItems'])
    router.post('addWatchedItem/:id', [WatchedItemsController, 'addItemToWatched'])
    router.delete('removeWatchedItem/:id', [WatchedItemsController, 'deleteWatchedItem'])
    //#endregion

    router.post('searchItem', [SearchesController, 'searchItem'])

    router.get('recommendations', [CatalogRecommendationsController, 'getRecommandations'])
  })
  .use(middleware.auth())
