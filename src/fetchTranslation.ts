import { http } from '@kivibot/core'
import crypto from 'node:crypto'

const md5 = (value: string) => crypto.createHash('md5').update(value).digest('hex')

const qs = (obj: Object, encode: boolean = false) => {
  let res = ''
  for (const [k, v] of Object.entries(obj)) res += `${k}=${encode ? encodeURIComponent(v) : v}&`
  return res.slice(0, res.length - 1)
}

const appVersion =
  '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'

const payload = {
  bv: md5(appVersion),
  client: 'fanyideskweb',
  doctype: 'json',
  version: '2.1',
  keyfrom: 'fanyi.web',
  action: 'FY_BY_DEFAULT',
  smartresult: 'dict'
}

const headers = {
  Host: 'fanyi.youdao.com',
  Origin: 'https://fanyi.youdao.com',
  'User-Agent': `Mozilla/${appVersion}`,
  Referer: 'https://fanyi.youdao.com/',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  Cookie: `OUTFOX_SEARCH_USER_ID=-164878527@10.108.162.134; OUTFOX_SEARCH_USER_ID_NCOO=1971860328.1620116";`
}

const api = 'https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'
const key = 'Ygy_4c=r#e#4EX^NUGUc5'

export async function fetchTranslation(text: string, to = 'auto', from = 'auto') {
  const i = text
  const lts = '' + new Date().getTime()
  const salt = lts + parseInt(String(10 * Math.random()), 10)
  const sign = md5(payload.client + i + salt + key)

  const postData = qs({
    i,
    lts,
    sign,
    salt,
    from,
    to,
    ...payload
  })

  const { data: _data, status } = await http.post(api, postData, { headers })

  if (status !== 200) {
    console.log(_data)
    throw new Error('Youdao API Error')
  }

  const transRes = _data?.translateResult?.map((e: any) => e[0]?.tgt || '')
  const smartRes = _data?.smartResult
  const res = smartRes?.entries?.filter(Boolean).join('\n') || transRes?.filter(Boolean).join('\n')

  return res.trim()
}
