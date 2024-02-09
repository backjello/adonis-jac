import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class Logrequest {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    // stampiamo a video l'url della richiesta
    console.log(request.url());

    await next()

  }
}
