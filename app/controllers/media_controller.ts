import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { MediaService } from '#services/media_service'

@inject()
export default class MediaController {
  constructor(private mediaService: MediaService) {}

  async getMediaInfo({ auth, params, response }: HttpContext) {
    const id = params.id

    const media = await this.mediaService.getMediaInfo(id, auth.user!.id.toString())

    if (!media) {
      return response.notFound({ message: 'Media not found' })
    }

    return response.ok(media)
  }
}
