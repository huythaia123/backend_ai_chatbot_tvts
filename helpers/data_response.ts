type TDataResponse = {
  message: string
  data?: Record<string, unknown>
  [key: string]: unknown
}

export default class DataResponse {
  public constructor(body: TDataResponse) {
    Object.assign(this, body)
  }
}
