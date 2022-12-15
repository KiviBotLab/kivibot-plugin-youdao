import test from 'ava'

import { langs } from './lib/index.js'
import { fetchTranslation } from './lib/fetchTranslation.js'

test('zh-to-auto', async t => {
  try {
    const res = await fetchTranslation('你好')
    t.log(res)
    t.true(res !== '')
  } catch (e) {
    console.error(e)
    t.fail()
  }
})

test('other-to-auto', async t => {
  try {
    const res = await fetchTranslation('Hello')
    t.log(res)
    t.true(res !== '')
  } catch (e) {
    console.error(e)
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
  } catch (e) {
    console.error(e)
    t.fail()
  }
})

test('index English', async t => {
  try {
    const res = await fetchTranslation(`1. I love you. 2. you are lovely.`)

    t.log(res)
    t.true(res !== '')
  } catch (e) {
    console.error(e)
    t.fail()
  }
})

test('langs', async t => {
  let flag = true

  for (const { target } of langs) {
    try {
      const res = await fetchTranslation('你好，我很可爱，请给我钱', target)

      t.log(`目标语言: ${target}, 翻译结果: `, res)

      flag &&= res !== ''
    } catch (e) {
      console.error(e)
      t.fail()
    }
  }

  t.true(flag)
})
