import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class DocumentEmbedding extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // ===== DATA COLUMNS =====
  @column()
  declare source: string // tên file: quy_che.txt, quy_che_2024.pdf...

  @column()
  declare content: string // nội dung chunk (pageContent)

  @column()
  declare embedding: string // vector(768) – pgvector // lưu dưới dạng array number trong code

  @column({ columnName: 'chunk_index' })
  declare chunkIndex: number | null

  @column({ columnName: 'token_count' })
  declare tokenCount: number | null

  @column({ columnName: 'chunk_metadata' })
  declare chunkMetadata: Record<string, any> | null

  // ===== TIMESTAMPS =====
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
