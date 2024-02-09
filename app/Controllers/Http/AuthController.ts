import Mail from '@ioc:Adonis/Addons/Mail';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import VerificationCode from 'App/Models/VerificationCode';
import { randomNumber, randomstring } from 'App/lib/utils';
import { OAuth2Client } from 'google-auth-library';

export default class AuthController {

  async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.attempt(email, password, {
      expiresIn: "365day" // data di scadenza token
    })


    const user = auth.use('api').user // potrebbe essere undefined se non autenticato

    if (!user?.emailVerified) {
      return "devi verificare la mail"
    }

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
        emailVerified: data?.email_verified,
        password: randomstring(64) // metto una password casuale
      })
    }

    if (!user.emailVerified) {
      return "devi verificare la mail"
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

  async verifyEmail({ request }) {
    const email = request.input('email')
    const code = request.input('code')

    const user = await User.findBy('email', email)

    if (!user)
      return "devi registrarti prima"

    const DBcode = await VerificationCode
      .query()
      .where('user_id', user.id)
      .andWhere('code', code)

    if (DBcode.length == 0) {
      return "il codice di verifica non è valido"
    }

    user.emailVerified = true

    await user.save()
  }


  async sendVerificationCode({ request }: HttpContextContract) {
    const email = request.input('email')
    const user = await User.findBy('email', email)
    if (!user || user?.emailVerified) {
      return "non puoi richiedere la verifica della email"
    }

    const code = await VerificationCode.create({
      userId: user.id,
      code: randomNumber(6)
    })

    await Mail.send((message) => {
      message
        .to(user.email, user.name)
        .from('testjac64@gmail.com', 'no-reply')
        .replyTo('assistenza-clienti@dominio.it', 'Assistenza Clienti')
        .subject('Verifica la tua email')
        .htmlView('email/verification', {
          code: code.code, // il codice di verifica
          name: user.name
        })
    })


  }
}
