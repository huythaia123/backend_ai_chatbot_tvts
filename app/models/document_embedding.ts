import { DateTime } from 'luxon'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Document from './document.js'

export default class DocumentEmbedding extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'document_id' })
  declare documentId: number

  @column({ columnName: 'chunk_index' })
  declare chunkIndex: number

  @column({ columnName: 'chunk_content' })
  declare chunkContent: string // nội dung chunk (pageContent)

  @column({ columnName: 'chunk_metadata' })
  declare chunkMetadata: Record<string, any> | null

  @column()
  declare embedding: string // vector(768) – pgvector // lưu dưới dạng array number trong code

  @column({ columnName: 'token_count' })
  declare tokenCount: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // relationship
  @belongsTo(() => Document)
  declare document: BelongsTo<typeof Document>
}
