import { KiviPlugin } from '@kivibot/core'

import { fetchTranslation } from './fetchTranslation'

const plugin = new KiviPlugin('有道翻译', '1.1.0')

const langs = [
  { match: /^翻译/, target: 'auto' },
  { match: /^译中/, target: 'zh-CHS' },
  { match: /^译繁/, target: 'zh-CHT' },
  { match: /^译粤/, target: 'yue' },
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

plugin.onMounted(() => {
  langs.forEach(lang => {
    plugin.onMatch(lang.match, async event => {
      const text = event.raw_message.replace(/\{.*\}/g, '').replace(lang.match, '')

      if (!text) {
        event.reply('翻译内容不能为空', true)
      }

      try {
        const res = await fetchTranslation(text, lang.target)
        await event.reply(res || '找不到翻译结果', true)
      } catch (e) {
        plugin.throwPluginError(String(e))
        await event.reply('翻译遇到错误，稍后再试试吧', true)
      }
    })
  })
})

export { plugin }
