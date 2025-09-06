import { inject } from '@adonisjs/core'
import { TMDBService } from '#services/tmdb_service'
import WatchedItem from '#models/watched_item'

@inject()
export class MediaService {
  constructor(private tmdbService: TMDBService) {}

  async getMediaInfo1(idTmdb: string) {
    return await this.tmdbService.getItem(idTmdb, 'movie')
  }
  async getMediaInfo(id: string, userId: string) {
    // Récupère les infos depuis TMDB
    const media = await this.tmdbService.getItem(id, 'movie')
    if (!media) return null

    // Vérifie si l’utilisateur a déjà vu le film
    const watched = await WatchedItem.query()
      .where('user_id', userId)
      .andWhere('id_tmdb', id)
      .first()

    const isSeen = !!watched

    return { ...media, isSeen }
  }
}
