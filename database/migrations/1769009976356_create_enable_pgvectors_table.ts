import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  // protected tableName = 'enable_pgvectors'

  async up() {
    this.schema.raw(`CREATE EXTENSION IF NOT EXISTS vector`)
  }

  async down() {
    this.schema.raw(`DROP EXTENSION IF EXISTS vector`)
  }
}
