import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { randomstring } from 'App/lib/utils';
import { OAuth2Client } from 'google-auth-library';

export default class AuthController {

  async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.attempt(email, password, {
      expiresIn: "365day" // data di scadenza token
    })


    const user = auth.use('api').user // potrebbe essere undefined se non autenticato

    return {
      token: token.toJSON(), // serializzo il token
      user: user
    }
  }

  async loginGoogle({ request, auth }: HttpContextContract) {
    const tokenGoogle = request.input('token')
    const google = new OAuth2Client() // client di google per autenticazione
    // passo a google il token per verificarlo
    const token = await google.verifyIdToken({
      idToken: tokenGoogle
    })
    const data = token.getPayload()
    console.log(data);

    // var
    var user = await User.findBy('email', data?.email)

    if (!user) {
      user = await User.create({
        email: data?.email,
        name: data?.given_name,
        surname: data?.family_name,
        password: randomstring(64) // metto una password casuale
      })
    }

    const myToken = await auth.use('api').generate(user, {
      expiresIn: '365day'
    })

    return {
      token: myToken.toJSON(), // serializzo il token
      user: user
    }

  }


  async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke() // elimina il token dal DB
    return "logout avvenuto con successo"
  }

}
