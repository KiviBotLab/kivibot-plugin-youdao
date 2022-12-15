import crypto from 'node:crypto'
import { http, md5, qs } from '@kivibot/core'

const key = 'ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl'
const iv = 'ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4'

const keyApi = 'https://dict.youdao.com/webtranslate/key'
const translationApi = 'https://dict.youdao.com/webtranslate'

const cookie =
  'OUTFOX_SEARCH_USER_ID_NCOO=1437677400.9626737; OUTFOX_SEARCH_USER_ID=1833413818@39.168.86.181'

const headers = {
  cookie,
  referer: 'https://fanyi.youdao.com/',
  'content-type': 'application/x-www-form-urlencoded'
}

const alloc = (key: string) => Buffer.alloc(16, md5(key))

const AesDecode = (value: string) => {
  const encoder = crypto.createDecipheriv('aes-128-cbc', alloc(key), alloc(iv))
  return encoder.update(value, 'base64', 'utf-8') + encoder.final('utf-8')
}

function getSign(now: string, secrectkey: string) {
  return md5(`client=fanyideskweb&mysticTime=${now}&product=webfanyi&key=${secrectkey}`, 'hex')
}

function getParams(secrectkey: string) {
  const now = '' + Date.now()

  return {
    sign: getSign(now, secrectkey),
    client: 'fanyideskweb',
    product: 'webfanyi',
    appVersion: '1.0.0',
    vendor: 'web',
    pointParam: 'client,mysticTime,product',
    mysticTime: now,
    keyfrom: 'fanyi.web'
  }
}

async function getSecretKey() {
  const params = {
    keyid: 'webfanyi-key-getter',
    ...getParams('asdjnjfenknafdfsdfsd')
  }

  const { data } = await http.get(keyApi, { params })

  return data?.data?.secretKey || ''
}

export async function fetchTranslation(text: string, to = 'auto', from = 'auto') {
  const key = await getSecretKey()

  const payload = {
    from,
    to,
    i: text,
    dictResult: true,
    keyid: 'webfanyi',
    ...getParams(key)
  }

  const { data } = await http.post(translationApi, qs(payload), { headers })

  const decoded = JSON.parse(AesDecode(data))
  const tgts = decoded?.translateResult?.flat(Infinity)?.map((e: any) => e.tgt) || []

  return tgts.filter(Boolean).join('').trim()
}
