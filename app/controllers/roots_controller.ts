// import { GoogleGenAI } from '@google/genai'
import DocumentEmbedding from '#models/document_embedding'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import fs from 'node:fs'
import path from 'node:path'
import EmbeddingService from '#services/embedding_service'

export default class RootsController {
  private embeddingService = new EmbeddingService()

  async index2() {
    // const embedContent = await this.embeddingService.embedContent({
    //   contents: 'pageContent',
    //   model: 'gemini-embedding-001',
    //   config: { outputDimensionality: 768 },
    // })
    // const fileContent = fs.readFileSync(
    //   path.join(
    //     process.cwd(),
    //     'documents/quy-che-tuyen-sinh-dai-hoc-chinh-quy-cua-truong-dai-hoc-phenikaa.txt'
    //   ),
    //   'utf-8'
    // )
    // const splitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 700,
    //   chunkOverlap: 120,
    // })
    // const chunks = await splitter.createDocuments([fileContent])
    // return { length: chunks.length, chunks }
  }

  async index() {
    // const docsDir = path.join(process.cwd(), 'documents')
    // const files = fs.readdirSync(docsDir)
    // const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 700, chunkOverlap: 140 })

    // for (const file of files) {
    //   const filePath = path.join(docsDir, file)
    //   const fileContent = fs.readFileSync(filePath, 'utf-8')
    //   const chunks = await splitter.createDocuments([fileContent])
    //   const pageContent = chunks.map((item) => item.pageContent)

    //   const embedContent = await this.embeddingService.embedContent({
    //     contents: pageContent,
    //     model: 'gemini-embedding-001',
    //     config: { outputDimensionality: 768 },
    //   })

    //   const embeddings = embedContent.embeddings

    //   for (const [idx, chunk] of chunks.entries()) {
    //     await DocumentEmbedding.create({
    //       source: file,
    //       content: chunk.pageContent,
    //       embedding: JSON.stringify(embeddings?.[idx]?.values),
    //       // embedding: this.toPgVector(embeddings?.[idx]?.values),
    //       chunkIndex: idx,
    //       // tokenCount: chunk.pageContent.length,
    //       chunkMetadata: chunk.metadata,
    //     })
    //   }
    // }

    const de = await DocumentEmbedding.query().orderBy(['source', 'chunk_index'])
    return { de }
  }
}
