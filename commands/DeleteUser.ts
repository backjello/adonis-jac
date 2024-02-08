import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class DeleteUser extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'delete:user'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Cancelliamo tutti gli utenti creati prima della data passata come argomento o un utente passato per id'

  @flags.number({
    name: 'id',
    description: 'ID dell\'utente da cancellare'
  })
  public id: number

  @flags.string({
    name: 'date',
    alias: 'd',
    description: 'Data per la cancellazione degli utenti'
  })
  public date: string

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
    const { default: User } = await import('./../app/Models/User')
    if (this.id) {
      await User.query().where('id', this.id).delete()
    }
    else if (this.date) {
      const users = await User.query().where('created_at', '<=', this.date).delete()
    }
    else {
      this.logger.error("devi scrivere la data o l'id")
    }
  }
}
