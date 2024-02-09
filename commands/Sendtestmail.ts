import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class Sendtestmail extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'sendtestmail'

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
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const { default: Mail } = await import('@ioc:Adonis/Addons/Mail')
    await Mail.send((message) => {
      message
        .to('jackbello97@gmail.com', 'Giacomo Bello')
        .from('testjac64@gmail.com', 'TEST per JAC')
        .subject('test')
        .html(`
          <h1>Mail di prova</h1>
        `)
    })
  }
}
