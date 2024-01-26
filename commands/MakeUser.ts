import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone'

export default class MakeUser extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'fake:user'

  @flags.number({
    name: 'number',
    description: 'numero di utenti da creare',
    alias: 'n'
  })
  public number: string

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    this.logger.info('creo ' + this.number + " utenti")
    const { default: User } = await import('./../app/Models/User')
    //const { default: UserFactory } = await import('Database/factories/UserFactory')

    // await User.create({
    //   name:Fak
    // })
    // const u = UserFactory.make()
    // console.log(u);

  }
}
