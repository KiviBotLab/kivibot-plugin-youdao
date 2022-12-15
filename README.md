# 有道翻译 for KiviBot

[![npm-version](https://img.shields.io/npm/v/kivibot-plugin-youdao?color=527dec&label=kivibot-plugin-youdao&style=flat-square)](https://npm.im/kivibot-plugin-youdao)
[![dm](https://shields.io/npm/dm/kivibot-plugin-youdao?style=flat-square)](https://npm.im/kivibot-plugin-youdao)

[`KiviBot`](https://beta.kivibot.com) 的 [有道翻译](https://fanyi.youdao.com/) 插件，支持多达十五种语言的相互翻译。

**安装**

```shell
/plugin add youdao
```

**启用**

```shell
/plugin on youdao
```

**使用**

命令列表：

```shell
有道翻译
```

中外互译：

```shell
翻译你好
翻译hello
翻译おはよう
```

指定目标语言（自动检测源语言）：

```shell
译中hello
译英hello
译日hello
译韩hello
译法hello
译德hello
译俄hello
...
```

> 所有语言参考：[源代码](https://github.com/KiviBotLab/kivibot-plugin-youdao/blob/main/src/index.ts#L8-L25)
