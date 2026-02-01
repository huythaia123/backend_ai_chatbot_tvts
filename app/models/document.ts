import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import DocumentEmbedding from './document_embedding.js'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'file_name' })
  declare fileName: string

  @column({ columnName: 'file_path', serializeAs: null })
  declare filePath: string

  @column({ serializeAs: null })
  declare hash: string

  // timestamps
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // relationship
  @hasMany(() => DocumentEmbedding)
  declare documentEmbeddings: HasMany<typeof DocumentEmbedding>
}
