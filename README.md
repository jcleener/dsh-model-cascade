# dsh-model-cascade

> DSH（DeepSeek Harness）插件：把会话框（已有会话与新建会话共用）的模型选择从「按供应商分组的列表」变成**三级级联菜单**：
> **供应商 → 系列 → 完整模型名**。

## 功能

- **三级级联**：
  - 第一级 供应商 —— harness 实际配置的 API 路由组（如 DeepSeek / opencode-go / siliconflow / 火山引擎，取 `group.name`）
  - 第二级 系列 —— 模型 ID 最后一个 `/` 与之后第一个 `-` 之间的文本（如 `deepseek-ai/DeepSeek-V4-Pro` → `DeepSeek`）
  - 第三级 完整模型名 —— 完整模型 ID（如 `deepseek-ai/DeepSeek-V4-Pro`）
- **原生融合**：注册在 `conversation.input.model` 单座（`priority: -1`），覆盖自带的二级列表；数据与提交复用 `ui-model-selection` 的 `modelDirectories` 服务（`session.models` / `session.selectModel`），选择状态、连接重置处理、composer 阻塞行为与自带保持一致
- **菜单底部固定显示**当前使用中的模型（路由组 + 模型名）
- 菜单样式复用 DSH 原生主题 token（`--dsw-alias-*` / `--dsw-specific-menu`），明暗主题下观感一致

## 安装

```bash
dsh plugin --profile web add "github:jcleener/dsh-model-cascade"
# 或固定版本
dsh plugin --profile web add "github:jcleener/dsh-model-cascade#v0.1.0"
```

安装后重启 `dsh web` 生效。

## 使用

点击会话输入框的模型选择位，弹出三级级联菜单：先选供应商，再选系列，最后选完整模型名提交。菜单底部显示当前使用中的模型（路由组 + 模型名）。

## 关闭

在 `~/.dsh/profiles/<profile>/cordis.patch.yml` 中把该插件的 insert 段改为 `disabled: true`（或删除 insert 段），重启 `dsh web` 即回到自带的二级列表。

## 开发 / 结构

```
lib/index.js      Host 半段（空 apply，仅作为 Loader 条目存在）
lib/client.js     Client 半段（级联菜单 UI，纯 React + DSH 主题 token）
cordis.patch.yml  加载器补丁层（insert 声明）
```

## 许可证

MIT © 2025 [jcleener](https://github.com/jcleener)
