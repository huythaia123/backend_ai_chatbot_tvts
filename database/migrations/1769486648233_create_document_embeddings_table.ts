import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'document_embeddings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('source').notNullable() // tên file: quy_che.txt, quy_che_2024.pdf...
      table.text('content').notNullable() // đoạn text (chunk)
      /**
      ALTER TABLE document_embeddings
      ALTER COLUMN embedding TYPE vector(3072);
       */
      table.specificType('embedding', 'vector(768)')
      table.integer('chunk_index').nullable()
      table.integer('token_count').nullable()
      table.jsonb('chunk_metadata')
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
