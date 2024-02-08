import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Comment from 'App/Models/Comment';
import Post from 'App/Models/Post';

export default class CommentsController {

  // comments/?page=1&limit=25&post_id=1
  public async index({ request }: HttpContextContract) {
    // ritorno i commenti paginati in base all'id del post passato come parametro dal FE
    const postId = request.input('post_id')

    const page = request.input('page')

    // prendo al massimo 25 commenti
    const limit = Math.min(request.input('limit', 25), 25)

    const comments = await Comment.query().where('post_id', postId).paginate(page, limit)

    return comments
  }

  // comments/:id
  public async show() {

  }


}
