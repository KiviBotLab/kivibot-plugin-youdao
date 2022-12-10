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

test('en-to-auto', async t => {
  try {
    const res = await fetchTranslation('Hello')
    t.log(res)
    t.true(res !== '')
  } catch {
    t.fail()
  }
})

test('jp-to-auto', async t => {
  try {
    const res = await fetchTranslation('おはよう')
    t.log(res)
    t.true(res !== '')
  } catch {
    t.fail()
  }
})

test('auto-to-jp', async t => {
  try {
    const res = await fetchTranslation('Hello', 'ja')
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
