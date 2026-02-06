import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'document_embeddings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('document_id')
        .unsigned()
        .notNullable()
        .references('documents.id')
        .onDelete('cascade')
      table.integer('chunk_index').notNullable()
      table.text('chunk_content').notNullable() // đoạn text (chunk)
      table.jsonb('chunk_metadata').notNullable()
      table.specificType('embedding', 'vector(768)')
      // table.integer('token_count')
      table.timestamps(true)
    })

    // index tối ưu search cosine similarity
    this.schema.raw(`
      CREATE INDEX documents_embedding_hnsw_idx
      ON document_embeddings
      USING hnsw (embedding vector_cosine_ops);
    `)
    // this.schema.raw(`
    //   CREATE INDEX document_embeddings_embedding_idx
    //   ON document_embeddings
    //   USING ivfflat (embedding vector_cosine_ops)
    //   WITH (lists = 100);
    // `)
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
