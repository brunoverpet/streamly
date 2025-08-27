import env from '#start/env'

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3/'
export const language = '?language=fr-FR'

export const TMDB_HEADERS = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${env.get('TMDB_API_KEY')}`,
  },
}
