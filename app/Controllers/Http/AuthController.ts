import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {

  async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.attempt(email, password, {
      expiresIn: "3day"
    })

    return token
  }

}
