import { OidcClient } from '@axa-fr/react-oidc'
import axios, { AxiosError } from 'axios'

export const HTTP_VERBS = {
  get: 'get',
  post: 'post',
  put: 'put',
}

type Token = {
  expiresAt: number
  accessToken: string
}

async function getValidToken(): Promise<Token> {
  const getOidc = OidcClient.get
  const t = await getOidc().getValidTokenAsync()

  return t.tokens
}

function errorHandler(error: AxiosError) {
  if (axios.isAxiosError(error)) {
    if (!error?.response) {
      console.error('No Server Response')
    } else if (error.response?.status === 400) {
      console.error('Missing Username or Password')
    } else if (error.response?.status === 401) {
      console.error('Unauthorized')
    } else if (error.response?.status === 404) {
      console.error('Missing resource')
    } else {
      console.error('Login Failed')
    }
    throw error
  } else {
    throw new Error('different error than axios')
  }
}

function jwtHeaders(token: string | undefined, contentType?: string) {
  const headers = {
    'Content-type': contentType ?? 'application/json; charset=utf-8',
  }
  if (token)
    return {
      Authorization: `Bearer ${token}`,
      ...headers,
    }
  return headers
}

function publicHeader() {
  return { 'Content-type': 'application/json; charset=utf-8' }
}

export async function publicGetRequest<T>(url: string) {
  try {
    const headers = publicHeader()
    const { data } = await axios<T>({ method: HTTP_VERBS.get, url, headers })
    return data
  } catch (error: AxiosError | any) {
    errorHandler(error)
    throw new Error(`Request fail : ${url}`)
  }
}

export async function authenticatedGetRequest<T>(
  url: string,

  contentType?: string,
) {
  try {
    const headers = jwtHeaders((await getValidToken()).accessToken, contentType)
    const { data } = await axios<T>({
      method: HTTP_VERBS.get,
      url,
      headers,
    })
    return data
  } catch (error: unknown) {
    errorHandler(error as AxiosError)
    throw new Error(`Request fail : ${url}`)
  }
}

export async function authenticatedGetBlob(url: string) {
  try {
    const headers = jwtHeaders(
      (await getValidToken()).accessToken,
      'application/pdf',
    )
    const { data } = await axios<BlobPart>({
      method: HTTP_VERBS.get,
      url,
      headers,
      responseType: 'blob',
    })
    return data
  } catch (error: unknown) {
    errorHandler(error as AxiosError)
    throw new Error(`Request fail : ${url}`)
  }
}

export async function authenticatedPutRequest<T>(url: string, data: T) {
  try {
    const headers = jwtHeaders((await getValidToken()).accessToken)
    await axios<T>({ method: HTTP_VERBS.put, url, headers, data })
  } catch (error: unknown) {
    errorHandler(error as AxiosError)
    throw new Error(`Request fail : ${url}`)
  }
}
