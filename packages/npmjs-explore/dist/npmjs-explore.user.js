// ==UserScript==
// @name         npmjs-explore
// @name:zh      npmjs文件查看
// @namespace    https://github.com/lisonge
// @version      1.1.0
// @author       lisonge
// @description  npmjs-explore/npmjs文件查看
// @license      MIT
// @icon         https://static.npmjs.com/7a7ffabbd910fc60161bc04f2cee4160.png
// @homepageURL  https://github.com/lisonge/userscripts
// @source       https://github.com/lisonge/userscripts
// @include      /^https:\/\/www.npmjs.com\/package\/.*/
// @match        https://www.npmjs.com/package/*
// @require      https://cdn.jsdelivr.net/npm/preact@10.11.2
// ==/UserScript==

(function(preact2) {
  "use strict";
  var t, r, u, i, o$1 = 0, f = [], c = [], e = preact2.options.__b, a = preact2.options.__r, v = preact2.options.diffed, l = preact2.options.__c, m = preact2.options.unmount;
  function d(t2, u2) {
    preact2.options.__h && preact2.options.__h(r, t2, o$1 || u2), o$1 = 0;
    var i2 = r.__H || (r.__H = { __: [], __h: [] });
    return t2 >= i2.__.length && i2.__.push({ __V: c }), i2.__[t2];
  }
  function p(n) {
    return o$1 = 1, y(B, n);
  }
  function y(n, u2, i2) {
    var o2 = d(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [i2 ? i2(u2) : B(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.u)) {
      r.u = true;
      var f2 = r.shouldComponentUpdate;
      r.shouldComponentUpdate = function(n2, t2, r2) {
        if (!o2.__c.__H)
          return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return n3.__c;
        });
        if (u3.every(function(n3) {
          return !n3.__N;
        }))
          return !f2 || f2.call(this, n2, t2, r2);
        var i3 = false;
        return u3.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
          }
        }), !(!i3 && o2.__c.props === n2) && (!f2 || f2.call(this, n2, t2, r2));
      };
    }
    return o2.__N || o2.__;
  }
  function h(u2, i2) {
    var o2 = d(t++, 3);
    !preact2.options.__s && z(o2.__H, i2) && (o2.__ = u2, o2.i = i2, r.__H.__h.push(o2));
  }
  function b() {
    for (var t2; t2 = f.shift(); )
      if (t2.__P && t2.__H)
        try {
          t2.__H.__h.forEach(k), t2.__H.__h.forEach(w), t2.__H.__h = [];
        } catch (r2) {
          t2.__H.__h = [], preact2.options.__e(r2, t2.__v);
        }
  }
  preact2.options.__b = function(n) {
    "function" != typeof n.type || n.__m || null === n.__ ? n.__m || (n.__m = n.__ && n.__.__m ? n.__.__m : "") : n.__m = (n.__ && n.__.__m ? n.__.__m : "") + (n.__ && n.__.__k ? n.__.__k.indexOf(n) : 0), r = null, e && e(n);
  }, preact2.options.__r = function(n) {
    a && a(n), t = 0;
    var i2 = (r = n.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.__V = c, n2.__N = n2.i = void 0;
    })) : (i2.__h.forEach(k), i2.__h.forEach(w), i2.__h = [])), u = r;
  }, preact2.options.diffed = function(t2) {
    v && v(t2);
    var o2 = t2.__c;
    o2 && o2.__H && (o2.__H.__h.length && (1 !== f.push(o2) && i === preact2.options.requestAnimationFrame || ((i = preact2.options.requestAnimationFrame) || j)(b)), o2.__H.__.forEach(function(n) {
      n.i && (n.__H = n.i), n.__V !== c && (n.__ = n.__V), n.i = void 0, n.__V = c;
    })), u = r = null;
  }, preact2.options.__c = function(t2, r2) {
    r2.some(function(t3) {
      try {
        t3.__h.forEach(k), t3.__h = t3.__h.filter(function(n) {
          return !n.__ || w(n);
        });
      } catch (u2) {
        r2.some(function(n) {
          n.__h && (n.__h = []);
        }), r2 = [], preact2.options.__e(u2, t3.__v);
      }
    }), l && l(t2, r2);
  }, preact2.options.unmount = function(t2) {
    m && m(t2);
    var r2, u2 = t2.__c;
    u2 && u2.__H && (u2.__H.__.forEach(function(n) {
      try {
        k(n);
      } catch (n2) {
        r2 = n2;
      }
    }), u2.__H = void 0, r2 && preact2.options.__e(r2, u2.__v));
  };
  var g = "function" == typeof requestAnimationFrame;
  function j(n) {
    var t2, r2 = function() {
      clearTimeout(u2), g && cancelAnimationFrame(t2), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    g && (t2 = requestAnimationFrame(r2));
  }
  function k(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function w(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function z(n, t2) {
    return !n || n.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n[r2];
    });
  }
  function B(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  const getPackageMeta = () => {
    var _a, _b;
    const list = location.pathname.split("/");
    let name = list[2];
    let version = (_a = list[4]) != null ? _a : "latest";
    if (name.startsWith("@")) {
      name = list[2] + "/" + list[3];
      version = (_b = list[5]) != null ? _b : "latest";
    }
    return {
      name,
      version
    };
  };
  var _ = 0;
  function o(o2, e2, n, t2, f2) {
    var l2, s, u2 = {};
    for (s in e2)
      "ref" == s ? l2 = e2[s] : u2[s] = e2[s];
    var a2 = { type: o2, props: u2, key: n, ref: l2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_, __source: f2, __self: t2 };
    if ("function" == typeof o2 && (l2 = o2.defaultProps))
      for (s in l2)
        void 0 === u2[s] && (u2[s] = l2[s]);
    return preact2.options.vnode && preact2.options.vnode(a2), a2;
  }
  function App() {
    const [jsdelivrUrl, setJsdelivrUrl] = p("");
    const [unpkgUrl, setUnpkgUrl] = p("");
    h(() => {
      const invoke = () => {
        const {
          name,
          version
        } = getPackageMeta();
        setJsdelivrUrl(`https://cdn.jsdelivr.net/npm/${name}@${version}/`);
        setUnpkgUrl(`https://unpkg.com/browse/${name}@${version}/`);
      };
      invoke();
      const task = setInterval(invoke, 1e3);
      return () => {
        clearInterval(task);
      };
    }, []);
    return o(preact2.Fragment, {
      children: o("div", {
        style: {
          marginLeft: "20px"
        },
        children: [o("a", {
          href: unpkgUrl,
          title: unpkgUrl,
          target: "_blank",
          style: {
            color: "#bb2e3e",
            textDecoration: "none"
          },
          children: "unpkg"
        }), o("span", {
          style: {
            display: "inline-block",
            width: "10px"
          }
        }), o("a", {
          href: jsdelivrUrl,
          title: jsdelivrUrl,
          target: "_blank",
          style: {
            color: "#bb2e3e",
            textDecoration: "none"
          },
          children: "jsdelivr"
        })]
      })
    });
  }
  (() => {
    var _a;
    const {
      name
    } = getPackageMeta();
    const box = (_a = document.querySelector(`span[title="${name}"]`)) == null ? void 0 : _a.parentElement;
    if (!box) {
      console.warn("npmjs-explore inject failed");
      return;
    }
    const container = document.createElement("div");
    box.appendChild(container);
    preact2.render(o(App, {}), container);
  })();
})(preact);
