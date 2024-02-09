import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class FakeUsers extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'fake:users'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Genero X utenti casuali'

  @flags.number({
    alias: 'n',
    name: 'number',
    description: 'numeri di utenti da creare'
  })
  public number: number

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
    const { default: userFactory } = await import('Database/factories/UserFactory')
    const { default: User } = await import('App/Models/User')

    const fakeUsers = await userFactory.createMany(this.number)
    await User.createMany(fakeUsers)

  }
}
