# Remotion 音频图模板

这个模板用于创建"音频图"。换句话说，就是从播客节目或任何其他音频中制作视频片段。这是在社交媒体上分享音频片段的流行方式。

[示例视频](https://twitter.com/marcusstenbeck/status/1460641903326732300)

<p align="center">
  <img src="https://github.com/marcusstenbeck/remotion-template-audiogram/raw/main/Promo.png">
</p>

## 快速开始

```
npm i
```

```
npx remotion studio
```

开始进行以下修改：

- 在 `src/Root.tsx` 中或在 Studio 侧边栏中调整参数
- 替换 `public` 文件夹中的音频、封面和字幕文件

## 如何渲染我的视频？

运行以下命令：

```console
npx remotion render
```

或者查看 [Remotion 文档](/docs/render/)。有很多种渲染方式。

## 在哪里获取转录文本？

你可以生成字幕或提供一个 .srt 文件或遵循 [`@remotion/captions`](https://remotion.dev/docs/captions/caption) 格式的 .json 文件。

### 生成字幕

- 使用内置的转录脚本，基于 [`@remotion/install-whisper-cpp`](https://www.remotion.dev/docs/install-whisper-cpp/)：

  ```console
  bun transcribe.ts
  # 使用 Node.js: `npx tsx transcribe.ts`
  ```

  这将会：

  - 询问你的音频文件路径（支持任何 ffmpeg 格式）
  - 询问语音开始时间（避免背景音乐、介绍音乐或噪音的误触发）
  - 在 public 文件夹中生成 captions.json

- 或者，使用 [`@remotion/openai-whisper`](https://www.remotion.dev/docs/openai-whisper/openai-whisper-api-to-captions) 从 OpenAI Whisper 获取正确格式的字幕。

**从服务提供商获取：**

- 你的播客托管服务可能会为你提供字幕。
- Descript 让转录变·得非常简单。
- 还有很多其他付费解决方案，如 [Otter.ai](https://otter.ai)、[Scriptme.io](https://scriptme.io) 和 [ListenRobo.com](https://listenrobo.com)。

如果你提供 .srt 文件，请确保导出的字幕是按单词而不是按句子分段的。

## 长音频文件优化

如果你的音频很长，请确保传递 `.wav` 文件作为音频。  
模板将使用 [`useWindowedAudioData()`](/docs/use-windowed-audio-data) 只获取当前时间周围的数据。

否则，需要获取整个音频的波形，这可能会很慢。

## 文档

通过阅读 [基础知识页面](https://www.remotion.dev/docs/the-fundamentals) 开始使用 Remotion。

## 帮助

我们在 [Discord 服务器](https://discord.gg/6VzzNDwUwV) 上提供帮助。

## 感谢

源代码 [Remotion monorepo](https://github.com/remotion-dev/remotion/tree/main/packages/template-audiogram) 里，本项目基于它继续开发

## 许可证

请注意，依赖的某些包需要公司许可证。请阅读 [这里的条款](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)。