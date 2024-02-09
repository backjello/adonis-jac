import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class FakePosts extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'fake:posts'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Creiamo un post fittizio'

  @flags.number({
    description: 'Indica il numero di post da creare',
    name: 'number',
    alias: 'n'
  })
  public number: number // numero di post da generare casualmente

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
    this.logger.info('Creo ' + this.number + ' post')
    const { default: postFactory } = await import('Database/factories/PostFactory')
    const { default: Post } = await import('App/Models/Post')
    const postsFake = await postFactory.makeMany(this.number)
    console.log(postsFake);

    await Post.createMany(postsFake)

  }
}






