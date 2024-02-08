import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Post from 'App/Models/Post';
import PostFactory from 'Database/factories/PostFactory';

export default class PostsController {

  // voglio ritornare i post paginati
  public async index({ request }: HttpContextContract) {
    const page = request.input('page') // pagina
    const limit = 25

    // carico tutti gli utenti relativi ai post
    const posts = await Post.query().preload('user')
      .paginate(page, limit)

    return posts
  }

  public async store({ request }: HttpContextContract) {
    const post = await Post.create({
      body: request.input('body'),
      title: request.input('title'),
      userId: request.input('user_id')
    })

    await post.load('user')

    return post
  }

  public async destroy({ params }: HttpContextContract) {
    const id = params.id

    // metodo 1
    const post = await Post.find(id)
    await post?.delete()


    // metodo 2
    // DELETE FROM POSTS WHERE id = ?
    await Post.query()
      .where('id', id)
      .delete()
    // .debug(true) // mostra la query in console

    return
  }

  public async update({ request, params }: HttpContextContract) {
    const id = params.id
    const post = await Post.find(id)

    if (!post) {
      return "non ho trovato il post con ID " + id
    }

    // aggiorno un singolo campo di post
    // post.title = request.input('title')

    // aggiorno tutti i campi di post
    post.merge(request.all())

    // salvo il post
    await post.save()

    await post.load('user')

    return post
  }

  public async show({ params }: HttpContextContract) {
    const post = await Post.find(params.id)
    await post?.load('user')
    // {
    // title:'prova'
    // body:"sdfasdf"
    // user:{
    // name:...
    // surname:...
    //}
    //}
    return post
  }


  public async createFake({ request }: HttpContextContract) {
    const amount = parseInt(request.input('amount', 1))
    const postFake = await PostFactory.makeMany(amount) // array di post fake
    const post = await Post.createMany(postFake) // salvo nel DB i post appena creati
    return post
  }

}
