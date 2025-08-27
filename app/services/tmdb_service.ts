import { language, TMDB_BASE_URL, TMDB_HEADERS } from '#config/config_tmdb'

export class TmdbService {
  async getAllMovies() {
    return await this.fetchFromTmdb('discover/movie')
  }

  private async fetchFromTmdb(endpoint: string) {
    const url = TMDB_BASE_URL + endpoint + language
    try {
      const res = await fetch(url, TMDB_HEADERS)
      return await res.json()
    } catch (e) {
      console.error(e)
    }
  }
}
