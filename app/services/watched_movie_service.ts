import WatchedMovie from '#models/watched_movie'

export class WatchedMovieService {
  async getWatchedMovie() {
    return await WatchedMovie.all()
  }
}
