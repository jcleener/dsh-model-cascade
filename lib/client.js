window.__ModuleLoader__.load({
	id: "dsh-model-cascade",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		//#region styles
		/**
		 * Component-scoped styles, injected once. Reuses the same theme tokens
		 * the shipped model-seat menu uses (the --dsw-alias-* family and
		 * --dsw-specific-menu), so the cascade looks native in both themes.
		 */
		const css = [
			".dmc-root{min-width:0;position:relative}",
			".dmc-trigger{min-width:0;max-width:220px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:24px;outline:none;align-items:center;gap:4px;padding:0 4px 0 8px;font-size:13px;font-weight:500;line-height:20px;display:flex}",
			".dmc-trigger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}",
			".dmc-trigger:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}",
			".dmc-trigger:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}",
			".dmc-triggerLabel{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}",
			".dmc-triggerEffort{color:var(--dsw-alias-label-caption);flex:none}",
			".dmc-chevron{color:var(--dsw-alias-label-caption);flex:none;transition:transform .12s}",
			".dmc-chevronOpen{transform:rotate(180deg)}",
			".dmc-menu{z-index:20;border:1px solid var(--dsw-alias-border-inverted);background:var(--dsw-specific-menu);width:min(280px,100vw - 32px);max-height:min(420px,100vh - 96px);box-shadow:var(--dsw-shadow-lv3);color:var(--dsw-alias-label-primary);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);border-radius:12px;flex-direction:column;padding:4px;display:flex;position:absolute;bottom:calc(100% + 8px);right:0;overflow:hidden}",
			".dmc-crumb{color:var(--dsw-alias-label-secondary);align-items:center;gap:2px;padding:2px 4px 4px;font-size:12px;line-height:18px;display:flex;flex:none;min-width:0}",
			".dmc-back{cursor:pointer;background:0 0;border:none;color:inherit;font:inherit;padding:0 2px;display:inline-flex;align-items:center;gap:2px;border-radius:6px;flex:none}",
			".dmc-back:hover{background:var(--dsw-alias-interactive-bg-hover)}",
			".dmc-back:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}",
			".dmc-crumbText{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;min-width:0;color:var(--dsw-alias-label-caption)}",
			".dmc-crumbSep{color:var(--dsw-alias-label-caption);flex:none}",
			".dmc-pane{overflow-y:auto;flex:1;min-height:0;padding:2px}",
			".dmc-status,.dmc-empty{color:var(--dsw-alias-label-tertiary);padding:10px;font-size:13px;line-height:20px}",
			".dmc-error,.dmc-warning{background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary);border-radius:8px;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:4px;padding:7px 8px;font-size:12px;line-height:18px;display:flex}",
			".dmc-warning{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-state-warn-label)}",
			".dmc-retry{color:inherit;font:inherit;cursor:pointer;background:0 0;border:none;flex:none;padding:0;font-weight:600}",
			".dmc-cell{width:100%;cursor:pointer;background:0 0;border:none;border-radius:8px;align-items:center;gap:8px;padding:7px 8px;font:inherit;color:var(--dsw-alias-label-primary);text-align:left;display:flex}",
			".dmc-cell:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}",
			".dmc-cell:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}",
			".dmc-cellLabel{flex:1;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;font-size:13px;line-height:20px;font-weight:500;min-width:0}",
			".dmc-cellValue{color:var(--dsw-alias-label-caption);font-size:12px;line-height:18px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;max-width:110px;flex:none}",
			".dmc-cellCount{color:var(--dsw-alias-label-caption);font-size:12px;flex:none}",
			".dmc-cellChevron{color:var(--dsw-alias-label-caption);flex:none}",
			".dmc-option{width:100%;cursor:pointer;background:0 0;border:none;border-radius:8px;gap:8px;padding:7px 8px;font:inherit;color:var(--dsw-alias-label-primary);text-align:left;display:flex;align-items:center}",
			".dmc-option:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}",
			".dmc-option:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}",
			".dmc-option:disabled{cursor:default;opacity:.7}",
			".dmc-option.selected{background:var(--dsw-alias-interactive-bg-hover)}",
			".dmc-optionCopy{flex:1;min-width:0;display:flex;flex-direction:column}",
			".dmc-modelName{font-size:13px;line-height:20px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}",
			".dmc-description{color:var(--dsw-alias-label-caption);font-size:12px;line-height:18px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}",
			".dmc-check{color:var(--dsw-alias-brand-primary);flex:none;display:flex}",
			".dmc-current{border-top:1px solid var(--dsw-alias-border-l2);padding:8px 10px;display:flex;flex-direction:column;gap:1px;flex:none}",
			".dmc-currentProvider{color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px;font-weight:600;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}",
			".dmc-currentModel{color:var(--dsw-alias-label-caption);font-size:12px;line-height:18px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}"
		].join("");
		const tagId = "dsh-model-cascade/ModelCascadeSelect.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-model-cascade";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion

		//#region model id parsing
		/**
		 * Series for one model id: the text between the last "/" and the FIRST
		 * "-" after it (e.g. "deepseek" from "deepseek/deepseek-chat", "kimi"
		 * from "moonshotai/kimi-k2", "longcai" from ".../longcai-7b"). Without a
		 * "/", the whole id (or its part before the first "-") is the series.
		 * Display only — selection always submits the harness group id + model id.
		 */
		function seriesOf(modelId) {
			const slash = modelId.lastIndexOf("/");
			const rest = slash === -1 ? modelId : modelId.slice(slash + 1);
			const dash = rest.indexOf("-");
			return dash === -1 ? rest : rest.slice(0, dash);
		}

		/**
		 * Build the cascade tree from the directory's provider groups. Level 1
		 * is the HARNESS provider — the configured API route (e.g. DeepSeek /
		 * opencode-go / siliconflow / 火星引擎) — NOT the vendor prefix parsed
		 * from model ids (an aggregator catalog would explode into dozens).
		 * Level 2 is the series parsed from each model id; Level 3 the full id.
		 * Provider, series, and model order follow the directory's own order.
		 */
		function buildProviders(groups) {
			return groups.map((group) => {
				const series = [];
				const sIndex = new Map();
				for (const model of group.models) {
					const key = seriesOf(model.id);
					let ser = sIndex.get(key);
					if (ser === void 0) {
						ser = { key, label: key, models: [] };
						sIndex.set(key, ser);
						series.push(ser);
					}
					ser.models.push({ group, model });
				}
				return { key: group.id, label: group.name, series };
			});
		}

		/** Tiny local clsx (the module table does not expose `clsx` to plugins). */
		function cx() {
			let out = "";
			for (let i = 0; i < arguments.length; i++) {
				const v = arguments[i];
				if (v) out += (out ? " " : "") + v;
			}
			return out;
		}
		//#endregion

		//#region component
		/**
		 * ModelCascadeSelect: the composer model seat, three-level cascade
		 * (Provider -> Series -> Full model). Data and submission ride the SAME
		 * per-session ModelDirectory the shipped seat uses (reused through the
		 * `modelDirectories` service), so selection state, connection-reset
		 * handling, and the composer block stay shared and correct. The default
		 * seat's two-level list is shadowed by registering this seat at
		 * priority -1 (single slots: lowest priority renders).
		 */
		function ModelCascadeSelect({ locked, available, directory, load, select, t }) {
			const state = react.useSyncExternalStore((fn) => directory.subscribe(fn), () => directory.getSnapshot());
			const [open, setOpen] = react.useState(false);
			// Breadcrumb path: [] -> providers, [p] -> series of provider p, [p, s] -> models.
			const [path, setPath] = react.useState([]);
			const lastActionRef = react.useRef("load");
			const [toast, setToast] = react.useState(null);
			const toastSeq = react.useRef(0);
			const rootRef = react.useRef(null);
			const triggerRef = react.useRef(null);
			const paneRef = react.useRef(null);
			const id = react.useId();
			const providers = react.useMemo(() => buildProviders(state.groups), [state.groups]);

			const current = state.current;
			const currentModel = react.useMemo(() => {
				if (current === null || current === void 0) return void 0;
				for (const group of state.groups) for (const model of group.models) {
					if (group.id === current.provider && model.id === current.model) return model;
				}
				return void 0;
			}, [current, state.groups]);
			const modelLabel = currentModel !== void 0 ? currentModel.name : current !== null && current !== void 0 ? current.model : t("trigger.fallback");
			const effectiveEffort = current?.reasoningEffort ?? currentModel?.reasoning?.defaultEffort;
			const triggerLabel = effectiveEffort === void 0 ? modelLabel : modelLabel + " · " + effectiveEffort;
			const triggerAria = current === null || current === void 0 ? t("trigger.aria", { model: t("trigger.fallback") }) : t("trigger.aria", { model: modelLabel });
			// Footer: the currently-used provider + model, pinned at the menu bottom.
			const currentProviderName = current !== null && current !== void 0
				? (state.groups.find((g) => g.id === current.provider)?.name ?? current.provider)
				: null;
			const currentModelName = current !== null && current !== void 0
				? (currentModel !== void 0 ? currentModel.name : current.model)
				: null;
			const busy = state.status === "selecting";
			const reload = () => {
				lastActionRef.current = "load";
				load();
			};

			react.useEffect(() => {
				if (available) {
					lastActionRef.current = "load";
					load();
				}
			}, [available, load]);

			react.useEffect(() => {
				if (!open) return;
				const closeOutside = (event) => {
					if (!rootRef.current?.contains(event.target)) setOpen(false);
				};
				document.addEventListener("mousedown", closeOutside);
				return () => {
					document.removeEventListener("mousedown", closeOutside);
				};
			}, [open]);

			if (!available) return null;
			const show = () => {
				setPath([]);
				setOpen(true);
				reload();
			};
			const close = (restoreFocus = false) => {
				setOpen(false);
				setPath([]);
				if (restoreFocus) queueMicrotask(() => {
					triggerRef.current?.focus();
				});
			};
			const settle = (accepted) => {
				if (accepted) {
					if (rootRef.current !== null) close(true);
					return;
				}
				const message = directory.getSnapshot().error;
				if (message !== null) {
					toastSeq.current += 1;
					setToast({
						seq: toastSeq.current,
						text: t("error.action", { message })
					});
				}
			};
			const choose = (selection) => {
				if (current?.provider === selection.provider && current?.model === selection.model) {
					close(true);
					return;
				}
				lastActionRef.current = "select";
				select(selection).then(settle);
			};
			const onKeyDown = (event) => {
				if (event.key === "Escape" && open) {
					event.preventDefault();
					if (path.length > 0) setPath(path.slice(0, -1));
					else close(true);
					return;
				}
				if (!open) return;
				if (event.key === "ArrowDown" || event.key === "ArrowUp") {
					event.preventDefault();
					const items = paneRef.current?.querySelectorAll("button:not(:disabled)");
					if (items === void 0 || items.length === 0) return;
					const list = Array.from(items);
					const active = list.indexOf(document.activeElement);
					const delta = event.key === "ArrowDown" ? 1 : -1;
					const next = (active === -1 ? (delta === 1 ? -1 : 0) : active) + delta;
					list[(next + list.length) % list.length]?.focus();
				}
			};
			const onBlur = (event) => {
				if (event.relatedTarget instanceof Node && rootRef.current?.contains(event.relatedTarget)) return;
				close();
			};

			const activeProvider = path.length > 0 ? providers.find((p) => p.key === path[0]) : void 0;
			const activeSeries = path.length > 1 ? activeProvider?.series.find((s) => s.key === path[1]) : void 0;

			const renderPane = () => {
				const errorBlock = state.error !== null && lastActionRef.current === "load" ? (0, react_jsx_runtime.jsxs)("div", {
					className: "dmc-error",
					children: [
						(0, react_jsx_runtime.jsx)("span", { children: t("error.action", { message: state.error }) }),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: "dmc-retry",
							onClick: reload,
							children: t("action.reload")
						})
					]
				}) : null;
				const warnings = state.failures.map((failure) => (0, react_jsx_runtime.jsxs)("div", {
					className: "dmc-warning",
					children: [
						(0, react_jsx_runtime.jsx)("span", { children: t("warning.groupLoad", { name: failure.name, message: failure.message }) }),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: "dmc-retry",
							onClick: reload,
							children: t("action.reload")
						})
					]
				}, failure.id));

				if (state.status === "loading") {
					return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [errorBlock, (0, react_jsx_runtime.jsx)("div", { className: "dmc-status", children: t("status.loading") })] });
				}

				if (path.length === 0) {
					const rows = providers.map((prov) => {
						const count = prov.series.reduce((n, ser) => n + ser.models.length, 0);
						return (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "menuitem",
							className: "dmc-cell",
							title: prov.label,
							onClick: () => {
								setPath([prov.key]);
							},
							children: [
								(0, react_jsx_runtime.jsx)("span", { className: "dmc-cellLabel", children: prov.label }),
								(0, react_jsx_runtime.jsx)("span", { className: "dmc-cellCount", children: String(count) }),
								(0, react_jsx_runtime.jsx)(primitives.IconChevronRightOutline14, { className: "dmc-cellChevron" })
							]
						}, prov.key);
					});
					return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
						children: [
							errorBlock,
							warnings,
							state.status === "ready" && rows.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: "dmc-empty", children: t("empty.models") }) : null,
							rows
						]
					});
				}

				if (path.length === 1 && activeProvider !== void 0) {
					const rows = activeProvider.series.map((ser) => (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "menuitem",
						className: "dmc-cell",
						title: ser.label,
						onClick: () => {
							setPath([path[0], ser.key]);
						},
						children: [
							(0, react_jsx_runtime.jsx)("span", { className: "dmc-cellLabel", children: ser.label }),
							(0, react_jsx_runtime.jsx)("span", { className: "dmc-cellCount", children: String(ser.models.length) }),
							(0, react_jsx_runtime.jsx)(primitives.IconChevronRightOutline14, { className: "dmc-cellChevron" })
						]
					}, ser.key));
					return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
						children: [
							errorBlock,
							warnings,
							rows.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: "dmc-empty", children: t("empty.series") }) : null,
							rows
						]
					});
				}

				if (path.length === 2 && activeProvider !== void 0 && activeSeries !== void 0) {
					const rows = activeSeries.models.map(({ group, model }) => {
						const selected = current?.provider === group.id && current?.model === model.id;
						const caption = model.description !== void 0 ? model.description : model.name !== model.id ? model.name : void 0;
						return (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "menuitemradio",
							"aria-checked": selected,
							className: cx("dmc-option", selected && "selected"),
							title: model.id,
							disabled: busy,
							onClick: () => {
								choose({
									provider: group.id,
									model: model.id
								});
							},
							children: [
								(0, react_jsx_runtime.jsxs)("span", {
									className: "dmc-optionCopy",
									children: [
										(0, react_jsx_runtime.jsx)("span", { className: "dmc-modelName", children: model.id }),
										caption !== void 0 && (0, react_jsx_runtime.jsx)("span", { className: "dmc-description", children: caption })
									]
								}),
								(0, react_jsx_runtime.jsx)("span", {
									className: "dmc-check",
									children: selected ? (0, react_jsx_runtime.jsx)(primitives.IconCheckOutline16, {}) : null
								})
							]
						}, model.id);
					});
					return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
						children: [
							errorBlock,
							warnings,
							rows.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: "dmc-empty", children: t("empty.models") }) : null,
							rows
						]
					});
				}

				return null;
			};

			return (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: "dmc-root",
				onKeyDown: onKeyDown,
				onBlur: onBlur,
				children: [
					(0, react_jsx_runtime.jsxs)("button", {
						ref: triggerRef,
						type: "button",
						className: "dmc-trigger",
						"aria-label": triggerAria,
						"aria-haspopup": "menu",
						"aria-expanded": open,
						"aria-controls": open ? `${id}-menu` : void 0,
						title: triggerLabel,
						disabled: locked,
						onClick: () => {
							if (open) close();
							else show();
						},
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: "dmc-triggerLabel",
								children: modelLabel
							}),
							effectiveEffort !== void 0 && (0, react_jsx_runtime.jsx)("span", {
								className: "dmc-triggerEffort",
								children: effectiveEffort
							}),
							(0, react_jsx_runtime.jsx)(primitives.IconChevronDownOutline14, { className: cx("dmc-chevron", open && "dmc-chevronOpen") })
						]
					}),
					open && (0, react_jsx_runtime.jsxs)("div", {
						id: `${id}-menu`,
						className: "dmc-menu",
						role: "menu",
						"aria-label": t("menu.aria"),
						"aria-busy": state.status === "loading" || busy,
						children: [
							path.length > 0 && (0, react_jsx_runtime.jsxs)("div", {
								className: "dmc-crumb",
								children: [
									(0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "dmc-back",
										"aria-label": t("crumb.back"),
										onClick: () => {
											setPath(path.slice(0, -1));
										},
										children: [
											(0, react_jsx_runtime.jsx)(primitives.IconChevronLeftOutline14, {}),
											(0, react_jsx_runtime.jsx)("span", { className: "dmc-crumbText", children: path.length > 1 ? activeProvider?.label : t("level.provider") })
										]
									}),
									path.length > 1 && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
										children: [
											(0, react_jsx_runtime.jsx)("span", { className: "dmc-crumbSep", children: "/" }),
											(0, react_jsx_runtime.jsx)("span", { className: "dmc-crumbText", children: activeSeries?.label ?? activeProvider?.label })
										]
									})
								]
							}),
							(0, react_jsx_runtime.jsx)("div", {
								ref: paneRef,
								className: "dmc-pane",
								children: renderPane()
							}),
							currentProviderName !== null && currentModelName !== null && (0, react_jsx_runtime.jsxs)("div", {
								className: "dmc-current",
								children: [
									(0, react_jsx_runtime.jsx)("div", { className: "dmc-currentProvider", children: currentProviderName }),
									(0, react_jsx_runtime.jsx)("div", { className: "dmc-currentModel", children: currentModelName })
								]
							})
						]
					}),
					toast !== null && (0, react_jsx_runtime.jsx)(primitives.Toast, {
						text: toast.text,
						icon: (0, react_jsx_runtime.jsx)(primitives.IconWarningOutline16, {}),
						anchor: rootRef.current?.closest("[data-composer-card]") ?? null,
						onDone: () => {
							setToast(null);
						}
					}, toast.seq)
				]
			});
		}
		//#endregion

		//#region locales
		/** `model-cascade` namespace dictionaries. */
		const zh = {
			"trigger.fallback": "选择模型",
			"trigger.aria": "选择模型，当前 {model}",
			"menu.aria": "选择模型",
			"crumb.back": "返回",
			"level.provider": "供应商",
			"level.series": "系列",
			"status.loading": "正在刷新模型列表…",
			"error.action": "模型操作失败：{message}",
			"action.reload": "重新加载",
			"warning.groupLoad": "{name} 加载失败：{message}",
			"empty.models": "没有可用的模型。",
			"empty.series": "该供应商下没有可用的系列。"
		};
		const en = {
			"trigger.fallback": "Select model",
			"trigger.aria": "Select model, current {model}",
			"menu.aria": "Select model",
			"crumb.back": "Back",
			"level.provider": "Provider",
			"level.series": "Series",
			"status.loading": "Refreshing model list…",
			"error.action": "Model operation failed: {message}",
			"action.reload": "Reload",
			"warning.groupLoad": "{name} failed to load: {message}",
			"empty.models": "No models available.",
			"empty.series": "No series available for this provider."
		};
		//#endregion

		//#region plugin body
		/** Dictionary namespace owned by this plugin. */
		const NS = "model-cascade";
		/** Required services: the seat slot registry, the shared model directory, sessions, locale. */
		const inject = ["slots", "modelDirectories", "sessions", "locale"];

		/**
		 * Client plugin body: register the dictionaries, then register the
		 * cascading composer model seat over the shared ModelDirectory service
		 * at priority -1 so it shadows the shipped two-level seat.
		 */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-model-cascade: dictionaries");
			ctx.inject(["slots", "modelDirectories", "sessions"], (scope) => {
				const models = scope.modelDirectories;
				const sessions = scope.sessions;
				scope.slots.inject("conversation.input.model", () => scope.slots.register({
					name: "conversation.input.model",
					locale: NS,
					priority: -1,
					inject: (sessionId) => {
						const directory = models.directoryFor(sessionId);
						const available = sessions.subagentAddress(sessionId) === void 0;
						return {
							available,
							directory: directory.store,
							load: () => {
								if (available) directory.load().catch(() => {});
							},
							select: (selection) => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false)
						};
					}
				}, ModelCascadeSelect));
			});
		}
		//#endregion

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
