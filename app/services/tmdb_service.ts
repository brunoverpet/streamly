import { TMDB_BASE_URL, TMDB_HEADERS } from '#config/config_tmdb'

export class TmdbService {
  async getMovie() {
    await this.fetchFromTmdb('movie/263115')
  }

  private async fetchFromTmdb(endpoint: string) {
    const url = TMDB_BASE_URL + endpoint
    try {
      const res = await fetch(url, TMDB_HEADERS)
      return await res.json()
    } catch (e) {
      console.error(e)
    }
  }
}
