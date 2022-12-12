import test from 'ava'

import { fetchTranslation } from './lib/fetchTranslation.js'

test('zh-to-auto', async t => {
  try {
    const res = await fetchTranslation('你好')
    t.log(res)
    t.true(res !== '')
  } catch {
    t.fail()
  }
})

test('other-to-auto', async t => {
  try {
    const res = await fetchTranslation('Hello')
    t.log(res)
    t.true(res !== '')
  } catch {
    t.fail()
  }
})

test('multiple lines', async t => {
  try {
    const res = await fetchTranslation(
      `你好
我没听清
能再说一遍吗`
    )

    t.log(res)
    t.true(res !== '')
  } catch {
    t.fail()
  }
})

const langs = [
  { match: /^翻译/, target: 'auto' },
  { match: /^译中/, target: 'zh-CHS' },
  { match: /^译繁/, target: 'zh-CHT' },
  { match: /^译英/, target: 'en' },
  { match: /^译日/, target: 'ja' },
  { match: /^译韩/, target: 'ko' },
  { match: /^译法/, target: 'fr' },
  { match: /^译阿/, target: 'ar' },
  { match: /^译德/, target: 'de' },
  { match: /^译俄/, target: 'ru' },
  { match: /^译荷/, target: 'nl' },
  { match: /^译泰/, target: 'th' },
  { match: /^译意/, target: 'it' },
  { match: /^译越/, target: 'vi' },
  { match: /^译西/, target: 'es' },
  { match: /^译葡/, target: 'pt' }
]

test('langs', async t => {
  let flag = true

  for (const { target } of langs) {
    try {
      const res = await fetchTranslation('你好，我很可爱，请给我钱', target)

      t.log(`目标语言: ${target}, 翻译结果: `, res)

      flag &&= res !== ''
    } catch {
      t.fail()
    }
  }

  t.true(flag)
})
