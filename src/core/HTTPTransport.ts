export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

function queryStringify (data: any): string {
  // не знаем какие данные получим
  const arr = []
  for (const key in data) {
    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key] as string))
  }
  return arr.length > 0 ? '?' + arr.join('&') : ''
}

interface OptionsGeneral {
  method: string
  data?: Document | XMLHttpRequestBodyInit | null | undefined
  headers?: Record<string, string>
  timeout?: number
  withCredentials?: boolean
  [x: string]: unknown
}

type OptionsType = Omit<OptionsGeneral, 'method'>
interface ConstructorOptionsType {
  baseUrl?: string
  url?: string
}

type HTTPMethod = (
  url: string,
  options: OptionsType
) => Promise<XMLHttpRequest>

export default class HTTPTransport {
  private readonly _baseUrl: string

  constructor ({
    baseUrl = 'https://ya-praktikum.tech/api/v2',
    url = ''
  }: ConstructorOptionsType) {
    this._baseUrl = baseUrl.concat(url)
  }

  get: HTTPMethod = async (url, options) => {
    const params = queryStringify(options.data)
    return await this.request(this._baseUrl + url + params, {
      ...options,
      method: METHOD.GET
    })
  }

  put: HTTPMethod = async (url, options) => {
    return await this.request(this._baseUrl + url, {
      ...options,
      method: METHOD.PUT
    })
  }

  post: HTTPMethod = async (url, options) => {
    return await this.request(this._baseUrl + url, {
      ...options,
      method: METHOD.POST
    })
  }

  delete: HTTPMethod = async (url, options) => {
    return await this.request(this._baseUrl + url, {
      ...options,
      method: METHOD.DELETE
    })
  }

  patch: HTTPMethod = async (url, options) => {
    return await this.request(this._baseUrl + url, {
      ...options,
      method: METHOD.PATCH
    })
  }

  request = async (url: string, options: OptionsGeneral): Promise<XMLHttpRequest> => {
    const {
      method,
      data,
      headers = {},
      timeout = 5000,
      withCredentials = false
    } = options

    return await new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.withCredentials = withCredentials

      for (const header in headers) {
        xhr.setRequestHeader(header.toString(), headers[header].toString())
      }

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject

      xhr.onerror = reject

      xhr.timeout = timeout

      xhr.ontimeout = reject

      if (method === METHOD.GET || data === undefined) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}
