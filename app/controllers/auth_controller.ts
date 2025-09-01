import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class AuthController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string(),
    })
  )

  static registerValidator = vine.compile(
    vine.object({
      firstname: vine.string().trim(),
      lastname: vine.string().trim(),
      email: vine.string().email(),
      password: vine.string().minLength(5).maxLength(15),
    })
  )

  async login({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(AuthController.validator)
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.ok({ message: 'Logged in successfully' })
  }

  async register({ request, response }: HttpContext) {
    const { firstname, lastname, email, password } = await request.validateUsing(
      AuthController.registerValidator
    )

    await User.create({
      firstname,
      lastname,
      email,
      password,
    })

    return response.ok({ message: 'Registered in successfully' })
  }

  logout({ auth, response }: HttpContext) {
    auth.use('web').logout()
    return response.ok({ message: 'Logged out successfully' })
  }
}
