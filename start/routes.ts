/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import WatchedMovie from '#models/watched_movie'
import Catalog from '#models/catalog'
const CatalogRecommendationsController = () =>
  import('#controllers/catalog_recommendations_controller')

router.get('/', async () => {
  const watchedMovies = await WatchedMovie.all()
  return {
    watchedMovies,
  }
})

router.get('/catalogs', async () => {
  const catalogs = await Catalog.all()
  return {
    catalogs,
  }
})

router.get('/catalogs/recommendations', [CatalogRecommendationsController, 'getRecommandations'])
