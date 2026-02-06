import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'documents'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('file_name').notNullable()
      table.string('file_path').notNullable()
      table.string('hash', 64).notNullable().unique() // tránh upload file trùng lặp
      table.integer('chunk_length')
      table.integer('count_tokens')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
