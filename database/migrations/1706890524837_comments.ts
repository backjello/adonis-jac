import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.text('text') // testo del commento

      // utente che ha scritto il commento
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      // post relativo al commento
      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
