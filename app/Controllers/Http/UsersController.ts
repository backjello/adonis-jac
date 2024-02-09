import Mail from '@ioc:Adonis/Addons/Mail';
import Hash from '@ioc:Adonis/Core/Hash';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import VerificationCode from 'App/Models/VerificationCode';
import { randomstring } from 'App/lib/utils';
import mail from 'Config/mail';

export default class UsersController {


  public async index({ request }: HttpContextContract) {
    // leggo tutti gli utenti
    // const users = await User.all()
    const limit = 25 // numero di risulati per pagina
    const page = request.input('page', 1) // pagina dalla quale partire
    const users = await User.query().paginate(page, limit)
    return users
  }

  public async show({ params }: HttpContextContract) {
    // trovo un singolo utente grazie al suo ID
    const user = await User.find(params.id)
    await user?.load('posts')
    // user.posts = [post1, post2, post3, ...]
    console.log(user);
    return user
  }

  public async store({ request }: HttpContextContract) {
    const all = request.all() // tutto il payload

    const user = await User.create({
      name: all.name,
      surname: all.surname,
      email: all.email,
      password: all.password,
      age: all.age
    })

    const code = await VerificationCode.create({
      userId: user.id,
      code: randomstring(6)
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

    return user
  }

  public async update({ params, request }: HttpContextContract) {
    const id = params.id // id dell'utente da aggiornare
    // lancia una eccezzione ROW_NOT_FOUND  se id non esiste
    const user = await User.findOrFail(id)

    // modifica di un singolo dato
    // const name = request.input('name')
    // user.name = name

    const data = request.except(['id', 'update_at', 'created_at'])

    user.merge(data) // sovrascrivo i dati con quelli nuovi

    await user.save() // salvo l'utente con i dati aggiornati nel DB

    return user
  }

  // funzione destroy - metodo DELETE
  public async destroy({ params }: HttpContextContract) {
    const user = await User.find(params.id)
    user?.delete() // cancello uno user
  }

  public async getByAge({ request }: HttpContextContract) {
    // ritorno gli utenti che hanno esattamente tot anni
    const users = await User.query()
      .where('age', '>', request.input('age-min'))
      .andWhere('age', '<', request.input('age-max'))


    return users
  }

}
