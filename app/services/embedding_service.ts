import {
  CountTokensParameters,
  EmbedContentParameters,
  EmbedContentResponse,
  GoogleGenAI,
} from '@google/genai'

export default class EmbeddingService {
  private ai = new GoogleGenAI({})

  async countTokens(params: CountTokensParameters) {
    return this.ai.models.countTokens(params)
  }

  async embedContent(params: EmbedContentParameters): Promise<EmbedContentResponse> {
    return this.ai.models.embedContent(params)
  }
}
