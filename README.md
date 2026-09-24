# dsh-model-cascade · 三级级联模型选择器

> 把输入框（composer）右下角的模型座位换成**三级级联菜单**：供应商 → 系列 → 完整模型。
> 内置座位是一层扁平长列表，模型一多就得靠滚动和记忆找；这里先选供应商、再选系列，
> 最后才落到具体模型 id，并在同一菜单里给出「思考强度」入口。
>
> 纯 UI 插件：宿主半是空的 `apply()`（只为在 Loader 里占一行），
> 真正干活的是浏览器半 `lib/client.js`，它注册到 `conversation.input.model` 座位，
> 以 `priority: -1` 遮蔽内置的两级列表。

## 特性

- **三级级联**：第 1 级是 harness 供应商分组（`group.name`，即配置里那条 API 路由），
  第 2 级是从模型 id 推断出的系列，第 3 级是完整模型 id。各级顺序沿用模型目录自己的顺序。
- **面包屑 + 返回**：菜单顶部显示当前层级路径，可逐级返回；Esc 也是「退一级」。
- **思考强度（effort）独立一屏**：当前模型支持 reasoning 时，根部多一行「思考强度」，
  进入后列出该模型的 effort 列表（含「默认」项），选择会提交
  `{ provider, model, reasoningEffort }`。
- **复用同一份 ModelDirectory**：`modelDirectories.directoryFor(sessionId)` 拿到的是内置座位
  用的那个 per-session 目录 store，因此选中态、连接重置、composer 阻塞等行为与内置座位一致。
- **状态可见**：加载中提示、整体加载失败（带「重新加载」）、**分组级**失败逐条告警、
  选择失败弹 Toast。
- **纯中英双语**：注册 `model-cascade` 命名空间字典（zh / en），无其它配置。

## 启用方式

`cordis.patch.yml` 是 bundle patch 层，内容就是一行挂载：

```yaml
- insert:
    - id: dsh-model-cascade
      name: dsh-model-cascade
```

- **宿主半**：`lib/index.js` 的 `apply() {}` 是空函数，不注册服务、不读配置、不占端口。
  它的存在只是让插件在 Loader 里有一个 `dsh-model-cascade` 条目。
- **浏览器半发现**：靠 `package.json` 的 `dsh.bundle.patch` 与 `dsh.client`
  （`platform: "web"`），浏览器半从 `exports["./client"]` 载入。
- **依赖的服务**（客户端 `inject`）：
  `slots`、`modelDirectories`、`sessions`、`locale`、`remote`、`remote.session`。
  后两个不是可选装饰：`ui-model-selection` 的 `directoryFor` 在铸造 per-session 目录时会解引用
  `this.ctx["remote.session"]`，缺了就会抛 "without inject"，座位被错误边界摘掉、内置座位重新生效
  （这段原因写在代码注释里）。
- 把包放进 profile 的 `node_modules` 并追加上面的 insert 行后，浏览器半随实例加载；
  客户端半的发现链路需要实例重启 + 浏览器硬刷新（与同仓 `dsh-qq-bridge` 同类，本插件代码内未体现）。
- **遮蔽机制**：同一 slot 单占用，**最低 priority 渲染**；本插件注册 `priority: -1`，
  压过内置的两级列表。内置座位的 priority 约定若变化，遮蔽可能失效。

## 配置项

无配置。宿主半没有 `settings.register(...)`，客户端半只注册 locale 字典：

```js
ctx.effect(() => ctx.locale.register('model-cascade', { zh, en }), 'dsh-model-cascade: dictionaries')
```

档位、开关、默认模型等都不由本插件提供；它只改写选择器的交互形态。

## 主要能力

**注册的 Slot**

| 项 | 值 |
|---|---|
| slot 名 | `conversation.input.model` |
| `locale` | `model-cascade` |
| `priority` | `-1`（遮蔽内置座位） |
| 组件入参 | `locked`、`available`、`directory`、`load`、`select`、`t` |

- `available = sessions.subagentAddress(sessionId) === undefined`：**子代理会话里座位不渲染**（`return null`）。
- `load()` 调目录 store 的 `load()`；`select(selection)` 调 `directory.select(...)`，
  成功/失败折成布尔，失败时用目录快照里的 `error` 弹 Toast。
- 数据来自 `directory.subscribe` / `directory.getSnapshot()`，读 `groups` / `current` / `status`
  （`loading` / `ready` / `selecting`）/ `error` / `failures`。

**交互**

- 触发按钮显示「当前模型名」+「思考强度名」（有 effort 时以 ` · ` 连接），
  `locked` 时禁用；`aria-haspopup="menu"` / `aria-expanded` / `aria-label` 齐备。
- 键盘：↑/↓ 在当前面板的可用按钮间循环聚焦；Esc = 退出 effort 屏 → 退一级 → 关闭并回焦触发按钮
  （Esc 同时挂文档级监听，因为点行会卸载该按钮、焦点落回 `<body>`）。
- 鼠标：点击菜单外部关闭，焦点离开根节点关闭；菜单底部固定显示「当前供应商 / 当前模型」。

**菜单内容**

- 第 1 级：供应商行（右侧显示该供应商下的模型总数）。
- 第 2 级：系列行（右侧显示系列内模型数）；系列名 = 模型 id 中最后一个 `/` 之后、
  第一个 `-` 之前的字符串（如 `deepseek/deepseek-chat` → `deepseek`）；无 `-` 时退化为整段。
- 第 3 级：完整模型 id（可选描述副标题，选中项打勾）。**点模型即直接选中**，
  需要调思考强度时再走根部的「思考强度」行分开设置。

## 文件结构

```
dsh-model-cascade/
├── README.md            # 本文件
├── package.json         # name/version 0.1.2；dsh.bundle.patch 指向 cordis.patch.yml；dsh.client（web）
├── cordis.patch.yml     # bundle patch 层：一行 insert 挂载 id/name = dsh-model-cascade
└── lib/
    ├── index.js         # 宿主半：空 apply()，只为让插件出现在 Loader 里
    └── client.js        # 浏览器半（预构建产物，window.__ModuleLoader__.load 工厂）：三级级联座位组件 + 字典
```

## 备注 / 已知限制

- **声明依赖与实际 require 不一致**：`package.json` 的 `dsh.client.inject` 声明了
  `@deepseek-ai/dsh-client-locale` 与 `@deepseek-ai/dsh-client-ui-model-selection`；
  而 `lib/client.js` 实际 `require` 的是 `react`、`react/jsx-runtime`、
  `@deepseek-ai/dsh-client-ui-primitives`（用到 `Toast`、`IconCheckOutline16`、
  `IconChevronRightOutline14`、`IconChevronDownOutline14`、`IconChevronLeftOutline14`、
  `IconWarningOutline16`）。也就是说：真正被 require 的 `ui-primitives` 未声明，
  声明的 `ui-model-selection` 从未被 require（它只作为被遮蔽的服务提供方间接存在）。
- `lib/client.js` 是**预构建产物**（`window.__ModuleLoader__.load` 工厂 + `react/jsx-runtime`
  编译后的 `jsx`/`jsxs` 调用），不是可直接阅读的 ESM/JSX 源码；源码形态未随包提供。
- **系列分组是启发式的**：完全按 id 文本切分，不看模型元数据。同一系列命名不统一
  （例如带版本号的 `-v4` 前缀差异）会裂成多个系列；这仅是显示层的分组，选择时提交的始终是
  供应商分组 id + 完整模型 id。
- **CSS 与锚点硬编码**：样式只注入一次，判重键是
  `data-plugin-css="dsh-model-cascade/ModelCascadeSelect.module.css"`；Toast 的 `anchor`
  依赖 `[data-composer-card]` 这个属性选择器；宽度/高度用的是 `min(280px, 100vw - 32px)`
  与 `min(420px, 100vh - 96px)` 固定值。
- 宿主半**没有任何行为**：无服务、无 model 工具、无命令、无事件监听、无 HTTP 路由、无设置命名空间——
  想通过它暴露能力需要另行扩展 `lib/index.js`。
- `modelDirectories` / `sessions.subagentAddress` / `remote.session` 等都是 DSH 0.1.5-rc.1
  服务层的内部契约；服务重命名或签名变化时，本插件会在注册阶段或首次 `directoryFor` 时失败。

## 兼容性

- **DSH 0.1.7-rc.1：可用**（2026-09-24 实测，需两处适配后才可用）。
  1. **图标家族改名**：`dsh-client-ui-primitives` 把尺寸后缀图标整族删除
     （`IconChevronDownOutline14`、`IconWarningOutline16`…），改为描边档
     `…Artwork / …Regular / …Medium`。旧名字渲染时取到 `undefined` 会抛错，而 0.1.7 的槽位新增
     **abdicate（除名）**机制会把崩溃条目移出投影 —— 表现为「注册成功但座位消失、退回官方两级菜单」。
     已改名，并为原本 14px 的图标补 `size: 14`（`Regular` 档默认 16px）。
  2. **菜单底色**：`--dsw-specific-menu` 在 0.1.7 由不透明改为半透明
     （浅 `#f8f9fa94` / 深 `#30313680`，官方菜单配 `backdrop-filter` 做毛玻璃），本插件没配模糊
     → 菜单透出背后内容。已改用不透明的 `--dsw-alias-bg-layer-3`。
- **DSH 0.1.6-alpha.2：可用**。
