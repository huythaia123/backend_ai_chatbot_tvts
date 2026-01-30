import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'file_name' })
  declare fileName: string

  @column({ columnName: 'file_path', serializeAs: null })
  declare filePath: string

  @column({ serializeAs: null })
  declare hash: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
