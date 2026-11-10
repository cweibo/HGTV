# HGTV

> 为电视大屏与遥控器设计的短剧客户端。基于 HGhub 改造计划的第一步。

[![Status](https://img.shields.io/badge/status-UI%20foundation-dfff66)](https://github.com/cweibo/HGTV)
[![License](https://img.shields.io/badge/license-PolyForm%20Noncommercial-blue)](./LICENSE)

**当前状态：原创 TV 界面骨架，不是可观看内容的成品。**尚未接入 HGhub 数据接口，也未生成 Android APK。仓库中没有虚构的片源、播放地址或“已适配电视”的声明。

## 已包含

- 横屏电视首页：侧边导航、内容分区、海报网格
- 搜索、片单、详情与播放页的界面骨架
- 方向键空间焦点导航、确认键与返回键基础交互
- 清晰的焦点态、大尺寸文字与电视安全边距
- React + TypeScript + Vite 的轻量前端基础

## 尚未包含

- HGhub API、封面解密、真实剧集与视频播放
- Android TV Manifest、Leanback 启动器和 APK 打包
- Media3 / ExoPlayer 原生播放与硬解验证
- 真实电视兼容性、性能与长时间播放测试

## 本地预览

需要 Node.js 22+ 与 pnpm：

```sh
pnpm install
pnpm dev
```

浏览器打开 `http://localhost:5180`。`← ↑ ↓ →` 移动焦点，`Enter` 确认，`Backspace` 或 `Esc` 返回首页。生产构建：`pnpm build`。

## 技术路线

### 第一阶段：TV 界面骨架（当前）

先独立验证遥控交互与界面布局，不直接搬用手机端触控页面。所有内容位明确标注待接入，不用假数据冒充真实内容。

### 第二阶段：复用 HGhub 能力

计划保留其 Rust/Tauri 数据层，接入推荐、分类、搜索、详情、选集、收藏与历史。迁移上游代码时保留版权声明、上游链接和变更说明，不直接改写上游项目。

### 第三阶段：Android TV

横屏、电视启动器、DPAD/返回键、后台恢复、真实电视验证。若 WebView 播放不满足硬解或拖动需求，再引入 Kotlin + Media3 ExoPlayer 原生播放层。

## 与上游的关系

计划参考并在后续复用 [Minireel/HGhub](https://github.com/Minireel/HGhub)。当前提交为独立原创界面骨架，尚未复制其实现；后续涉及代码复用时将按上游 PolyForm Noncommercial 1.0.0 许可补充来源与变更声明。

本项目与 HGhub 作者及内容平台无官方关联，不提供、不存储任何音视频内容。仅供个人学习和非商业使用。

## 许可

[PolyForm Noncommercial 1.0.0](./LICENSE)。禁止打包出售、付费会员、广告变现等商业用途。
