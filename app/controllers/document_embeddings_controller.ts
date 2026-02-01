import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import type { HttpContext } from '@adonisjs/core/http'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import Document from '#models/document'
import DataResponse from '#helpers/data_response'

export default class DocumentEmbeddingsController {
  // chunk document
  async chunk({ params, response }: HttpContext) {
    const document = await Document.find(params.id)

    if (!document) return response.notFound(new DataResponse({ message: 'Document nf.' }))

    const docContent = readFileSync(join(process.cwd(), document.filePath), 'utf-8')
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 700, chunkOverlap: 120 })
    const chunks = await splitter.createDocuments([docContent])

    await document.related('documentEmbeddings').createMany(
      chunks.map((chunk, idx) => ({
        chunkIndex: idx,
        chunkContent: chunk.pageContent,
        chunkMetadata: chunk.metadata,
      }))
    )

    return response.created(
      new DataResponse({
        message: `Chunk document ${document.fileName} ok.`,
      })
    )
  }

  // embedding chunk
  async embedding({ params, response }: HttpContext) {
    const document = await Document.find(params.id)

    if (!document) return response.notFound(new DataResponse({ message: 'Document nf.' }))

    return response.created(
      new DataResponse({
        message: `Chunk document ${'document.fileName'} ok.`,
      })
    )
  }
}
