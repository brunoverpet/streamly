import { language, TMDB_BASE_URL, TMDB_HEADERS } from '#config/config_tmdb'
import { CatalogsItem, SearchItem, SingleItemFromTMDB } from '../interfaces/catalog_item.js'
import { TMDBPaginatedResponse } from '../interfaces/tmdb.js'

export class TMDBService {
  async getAllItems(type: 'movie' | 'tv', maxPages: number = 5): Promise<CatalogsItem[]> {
    let currentPage = 1
    const allResults: CatalogsItem[] = []

    while (currentPage <= maxPages) {
      const response: TMDBPaginatedResponse<CatalogsItem> = await this.fetchFromTmdb(
        `discover/${type}?language=fr-FR&page=${currentPage}`
      )

      allResults.push(...response.results)

      if (currentPage >= 2) break // si on dépasse le nombre total de pages, on stoppe
      currentPage++
    }

    return allResults
  }

  getItem(id: string, type: 'movie' | 'tv'): Promise<SingleItemFromTMDB> {
    return this.fetchFromTmdb(`/${type}/${id}?append_to_response=keywords,credits&`)
  }

  async searchItem(query: string): Promise<SearchItem> {
    // const query = q.toLowerCase().trim()
    const result: SearchItem = await this.fetchFromTmdb(
      `/search/movie?query=${encodeURIComponent(query)}&language=fr-FR`
    )

    console.log(query)
    // console.log(result)

    return result
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
