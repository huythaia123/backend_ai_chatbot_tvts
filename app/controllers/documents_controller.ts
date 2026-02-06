import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { type HttpContext } from '@adonisjs/core/http'
import { createReadStream, unlinkSync } from 'node:fs'
import { deleteDocumentValidator, uploadDocumentsValidator } from '#validators/document'
import app from '@adonisjs/core/services/app'
import Document from '#models/document'
import DataResponse from '#helpers/data_response'

export default class DocumentsController {
  private STORAGE_DOCUMENTS_PATH = 'storage/documents'

  private async hashFile(path: string) {
    return new Promise<string>((resolve, reject) => {
      const hash = createHash('sha256')
      const stream = createReadStream(path)

      stream.on('data', (chunk) => hash.update(chunk))
      stream.on('end', () => resolve(hash.digest('hex')))
      stream.on('error', reject)
    })
  }

  async index({ response }: HttpContext) {
    return response.ok(
      new DataResponse({
        message: 'Get documents ok.',
        data: { documents: await Document.query().orderBy('updated_at', 'desc') },
      })
    )
  }

  async store({ request, response }: HttpContext) {
    const { documents } = await request.validateUsing(uploadDocumentsValidator)

    const uploaded: any[] = []
    const duplicated: any[] = []

    for (const file of documents) {
      if (!file.tmpPath) continue

      const hash = await this.hashFile(file.tmpPath)

      const exists = await Document.query()
        .where('hash', hash)
        // .andWhere('file_name', file.clientName)
        .first()

      if (exists) {
        duplicated.push({
          file: file.clientName,
          reason: 'File content already exists',
        })
        continue
      }

      await file.move(app.makePath(this.STORAGE_DOCUMENTS_PATH), { name: file.clientName })

      const doc = await Document.create({
        fileName: file.clientName,
        filePath: join(this.STORAGE_DOCUMENTS_PATH, file.clientName),
        hash,
      })

      uploaded.push(doc)
    }

    if (duplicated.length) {
      return response.conflict(
        new DataResponse({
          message: 'Some files are duplicated',
          uploadedCount: uploaded.length,
          duplicated,
        })
      )
    }

    return response.created(
      new DataResponse({
        message: 'All documents uploaded successfully',
        uploadedCount: uploaded.length,
      })
    )
  }

  async show({ params, response }: HttpContext) {
    const document = await Document.find(params.id)

    if (!document) return response.notFound(new DataResponse({ message: 'Document nf.' }))

    await document.load('documentEmbeddings', (query) => {
      query
        .select('id', 'chunkContent', query.client.raw(`embedding IS NOT NULL as embedding`))
        .orderBy('id')
    })

    return response.ok(new DataResponse({ message: 'Get detail document ok.', data: { document } }))
  }

  async destroy({ request, response }: HttpContext) {
    const { ids } = await request.validateUsing(deleteDocumentValidator)
    const docs = await Document.query().whereIn('id', ids)

    for (const doc of docs) {
      unlinkSync(join(doc.filePath))
    }

    await Document.query().whereIn('id', ids).delete()
    return response.ok(new DataResponse({ message: 'Delete documents successfully.' }))
  }
}
