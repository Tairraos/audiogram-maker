# Remotion 音频图模板

本工具用于创建"音频转视频"。换句话说，就是从播客节目或任何其他音频中制作视频片段。这是在社交媒体上分享音频片段的流行方式。

## 准备
- 使用豆包生成播客音频，下载 `.wav` 文件
- 使用 audition 替换片花
- 使用 `turboscribe.ai` 生成字幕
- 使用 `职业卫生校对员` 智能体校对字幕
- 使用 `srtseg` 生成分词字幕

## 启动

进行以下修改：
- 在 `src/xonstants.ts` 中配置视频参数
- 替换 `public` 文件夹中的音频和字幕文件

## 预览
- `npx remotion studio`
- 在浏览器内预览成本

## 渲染
- 在浏览器内点击render
- 或者运行命令`npx remotion render`

## 下载
- 在out目录下
