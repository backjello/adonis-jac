import { BaseCommand, flags } from '@adonisjs/core/build/standalone';

export default class FakeComments extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'fake:comments'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Creo dei commenti casuali'


  @flags.number({
    name: 'number'
  })
  public number: number = 10 // valore di default se non mi viene passato nulla


  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const { default: commentFactory } = await import('Database/factories/CommentFactory')
    const { default: Comment } = await import('App/Models/Comment')
    const { default: Database } = await import('@ioc:Adonis/Lucid/Database')

    const commentsFake = await commentFactory.makeMany(this.number)
    await Comment.createMany(commentsFake)

    await Database.query().from('users').select('*').debug(true)
  }
}
