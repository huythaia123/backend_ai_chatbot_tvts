import { EmbedContentParameters, EmbedContentResponse, GoogleGenAI } from '@google/genai'

export default class EmbeddingService {
  private ai = new GoogleGenAI({})

  async embedContent(params: EmbedContentParameters): Promise<EmbedContentResponse> {
    return this.ai.models.embedContent(params)
  }
}
