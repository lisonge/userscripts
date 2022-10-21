// ==UserScript==
// @name         原神Wiki辅助工具
// @name:en      op wiki tool
// @namespace    https://dev.songe.li
// @version      1.1.1
// @author       lisonge
// @description  原神 Wiki 辅助工具, 1.显示/隐藏已完成成就
// @license      MIT
// @icon         https://dev.songe.li/favicon.svg
// @homepageURL  https://github.com/lisonge/userscripts
// @source       https://github.com/lisonge/userscripts
// @updateURL    https://cdn.jsdelivr.net/gh/lisonge/op-wiki-plus@main/dist/op-wiki-plus.user.js
// @include      https://wiki.biligame.com/ys/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.2.41/dist/vue.global.prod.js
// @require      data:application/javascript,window.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/naive-ui@2.33.5/dist/index.prod.js
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// ==/UserScript==

(t=>{const o=document.createElement("style");o.dataset.source="vite-plugin-monkey",o.innerText=t,document.head.appendChild(o)})(".root-0e587444{border-radius:50%;border-width:1px;padding:5px;border-color:#000;border-style:solid}.root-1fdb449b[data-v-b0854903]{color:#000;background-color:#fff;position:fixed;top:0;left:0;z-index:9999;display:flex;flex-direction:column;padding:10px;align-items:flex-start}.root-1fdb449b>*[data-v-b0854903]{margin-bottom:10px}.root-1fdb449b>*[data-v-b0854903]:last-child{margin-bottom:0}");

(function(vue, naiveUi, lodash) {
  var _a;
  "use strict";
  const key = "op-wiki-plus:config";
  const defaultConfig = {
    achievementVisibility: true
  };
  const globalConfig = vue.reactive(
    lodash.merge(defaultConfig, JSON.parse((_a = localStorage.getItem(key)) != null ? _a : "{}"))
  );
  vue.watch(
    () => globalConfig,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );
  const setAchievementVisibility = (show = true) => {
    var _a2, _b;
    if (!["/ys/%E5%A4%A9%E5%9C%B0%E4%B8%87%E8%B1%A1"].some(
      (p) => location.pathname.startsWith(p)
    )) {
      return;
    }
    const display = show ? "block" : "none";
    const catelogList = document.querySelectorAll(
      "#toc > ul  a > span.toctext.checked"
    );
    catelogList.forEach((el) => {
      var _a3;
      const target = (_a3 = el.parentElement) == null ? void 0 : _a3.parentElement;
      if (target) {
        target.style.display = display;
      }
    });
    const mainbodyList = document.querySelectorAll(
      `#mw-content-text div.bwiki-collection.checked`
    );
    if (mainbodyList.length > 0) {
      const realList = Array.from(
        (_b = (_a2 = mainbodyList[0].parentElement) == null ? void 0 : _a2.children) != null ? _b : []
      );
      mainbodyList.forEach((el) => {
        const index = realList.indexOf(el);
        el.style.display = display;
        if (index >= 0) {
          for (let i = index + 1; i < realList.length; i++) {
            const child = realList[i];
            if (!child.classList.contains("bwiki-collection")) {
              child.style.display = display;
            } else {
              break;
            }
          }
        }
      });
    }
  };
  const _hoisted_1$1 = /* @__PURE__ */ vue.createElementVNode("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    viewBox: "0 0 24 24"
  }, [
    /* @__PURE__ */ vue.createElementVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, [
      /* @__PURE__ */ vue.createElementVNode("path", { d: "M13 10l7.383 7.418c.823.82.823 2.148 0 2.967a2.11 2.11 0 0 1-2.976 0L10 13" }),
      /* @__PURE__ */ vue.createElementVNode("path", { d: "M6.293 15.293l-2.586-2.586a1 1 0 0 1 0-1.414l7.586-7.586a1 1 0 0 1 1.414 0l2.586 2.586a1 1 0 0 1 0 1.414l-7.586 7.586a1 1 0 0 1-1.414 0z" })
    ])
  ], -1);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "FloatIcon",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(naiveUi.NIcon), {
          size: "30",
          class: "root-0e587444"
        }, {
          default: vue.withCtx(() => [
            _hoisted_1$1
          ]),
          _: 1
        });
      };
    }
  });
  const FloatIcon_vue_vue_type_style_index_0_lang = "";
  const _withScopeId = (n) => (vue.pushScopeId("data-v-b0854903"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = { class: "root-1fdb449b" };
  const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "title" }, "\u539F\u795EWiki\u8F85\u52A9\u5DE5\u5177", -1));
  const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("div", null, [
    /* @__PURE__ */ vue.createTextVNode(" \u66F4\u591A\u529F\u80FD\u8BF7\u5728 "),
    /* @__PURE__ */ vue.createElementVNode("a", {
      href: "https://github.com/lisonge/op-wiki-plus/issues",
      target: "_blank"
    }, " issues "),
    /* @__PURE__ */ vue.createTextVNode(" \u63D0\u51FA ")
  ], -1));
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      window.setTimeout(() => {
        vue.watch(
          () => globalConfig.achievementVisibility,
          () => {
            setAchievementVisibility(!globalConfig.achievementVisibility);
          },
          { immediate: true }
        );
      }, 1e3);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          _hoisted_2,
          vue.createVNode(vue.unref(naiveUi.NSwitch), {
            value: vue.unref(globalConfig).achievementVisibility,
            "onUpdate:value": _cache[0] || (_cache[0] = ($event) => vue.unref(globalConfig).achievementVisibility = $event)
          }, {
            checked: vue.withCtx(() => [
              vue.createTextVNode(" \u5DF2\u5B8C\u6210\u6210\u5C31-\u9690\u85CF\u4E2D ")
            ]),
            unchecked: vue.withCtx(() => [
              vue.createTextVNode(" \u5DF2\u5B8C\u6210\u6210\u5C31-\u663E\u793A\u4E2D ")
            ]),
            _: 1
          }, 8, ["value"]),
          _hoisted_3,
          vue.createVNode(_sfc_main$1)
        ]);
      };
    }
  });
  const App_vue_vue_type_style_index_0_scoped_b0854903_lang = "";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key2, val] of props) {
      target[key2] = val;
    }
    return target;
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b0854903"]]);
  const app = document.createElement("div");
  document.body.appendChild(app);
  setTimeout(() => {
    vue.createApp(App).mount(app);
  });
})(Vue, naive, _);
