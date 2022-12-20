import { KiviPlugin } from '@kivibot/core'

import { fetchTranslation } from './fetchTranslation'

const { version } = require('../package.json')
const plugin = new KiviPlugin('有道翻译', version)

export const langs = [
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

plugin.onMounted(() => {
  plugin.onMatch(/^\s*(有道)?翻译\s*$/, e => {
    const list = langs.map(({ match }) => `${match.source.replace('^', '')}<翻译内容>`)
    e.reply(list.join('\n'), true)
  })

  langs.forEach(lang => {
    plugin.onMatch(lang.match, async event => {
      const text = event.raw_message.replace(lang.match, '')

      if (!text) return

      try {
        const res = await fetchTranslation(text, lang.target)
        await event.reply(res || '找不到翻译结果', true)
      } catch (e: any) {
        const msg = e?.raw_message ?? e.stack ?? JSON.stringify(e, null, 2)
        plugin.throwPluginError(msg)
        await event.reply(`翻译服务异常: ${msg}`, true)
      }
    })
  })
})

export { plugin }
