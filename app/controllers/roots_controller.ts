import { GoogleGenAI } from '@google/genai'
import fs from 'node:fs'

export default class RootsController {
  private chunkText(text: string, size: number): string[] {
    const chunks: string[] = []
    for (let i = 0; i < text.length; i += size) {
      chunks.push(text.substring(i, i + size))
    }
    return chunks
  }

  async index() {
    const fileContent = fs.readFileSync(
      process.cwd() +
        '/dataset/quy-che-tuyen-sinh-dai-hoc-chinh-quy-cua-truong-dai-hoc-phenikaa.txt',
      'utf-8'
    )
    const chunks = this.chunkText(fileContent, 3000)

    // const ai = new GoogleGenAI({})
    // const resp = await ai.models.embedContent({
    //   model: 'gemini-embedding-001',
    //   contents: ['Xin chào anh em', 'Em ăn cơm chưa'],
    // })

    return chunks
  }
}
