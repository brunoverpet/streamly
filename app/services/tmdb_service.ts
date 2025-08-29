import { language, TMDB_BASE_URL, TMDB_HEADERS } from '#config/config_tmdb'
import { SingleItemFromTMDB } from '../interfaces/catalog_item.js'

export class TmdbService {
  getAllItems(type: 'movie' | 'tv') {
    return this.fetchFromTmdb(`discover/${type}`)
  }

  getItem(id: string, type: 'movie' | 'tv'): Promise<SingleItemFromTMDB> {
    return this.fetchFromTmdb(`/${type}/${id}?append_to_response=keywords,credits&`)
  }

  private async fetchFromTmdb<T>(endpoint: string): Promise<T> {
    const url = TMDB_BASE_URL + endpoint + language
    try {
      const res = await fetch(url, TMDB_HEADERS)
      return (await res.json()) as T
    } catch (e) {
      throw e
    }
  }
}
