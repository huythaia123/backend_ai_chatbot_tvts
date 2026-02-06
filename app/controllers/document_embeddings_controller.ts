import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import type { HttpContext } from '@adonisjs/core/http'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import Document from '#models/document'
import DataResponse from '#helpers/data_response'
import EmbeddingService from '#services/embedding_service'

export default class DocumentEmbeddingsController {
  private embeddingService = new EmbeddingService()

  // chunk document
  async chunk({ params, response }: HttpContext) {
    const document = await Document.find(params.id)

    if (!document) return response.notFound(new DataResponse({ message: 'Document nf.' }))

    const docContent = readFileSync(join(process.cwd(), document.filePath), 'utf-8')
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 700, chunkOverlap: 120 })
    const chunks = await splitter.createDocuments([docContent])

    // countTokens sẽ trả về tổng số token cho toàn bộ đoạn văn bản, không trả riêng lẻ cho từng đoạn
    const countTokens = await this.embeddingService.countTokens({
      contents: chunks.map((item) => item.pageContent),
      model: 'gemini-embedding-001',
    })

    if (chunks.length > 0) document.chunkLength = chunks.length
    if (countTokens.totalTokens) document.countTokens = countTokens.totalTokens

    await document.save()

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
  async embeddings({ params, request, response }: HttpContext) {
    const document = await Document.find(params.id)

    if (!document) return response.notFound(new DataResponse({ message: 'Document nf.' }))

    const chunks = await document
      .related('documentEmbeddings')
      .query()
      .select('id', 'chunkContent')
      .whereIn('id', request.body().chunksId)
      .orderBy('id')

    const embedContent = await this.embeddingService.embedContent({
      contents: chunks.map((item) => item.chunkContent),
      model: 'gemini-embedding-001',
      config: { outputDimensionality: 768 },
    })

    for (let idx = 0; idx < chunks.length; idx++) {
      if (embedContent.embeddings)
        chunks[idx].embedding = JSON.stringify(embedContent.embeddings[idx].values)
    }

    await document.related('documentEmbeddings').saveMany(chunks)

    return response.created(
      new DataResponse({
        message: `Embeddings ok.`,
      })
    )
  }
}
