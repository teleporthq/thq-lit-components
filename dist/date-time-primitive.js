/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = window, gt = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Nt = Symbol(), bt = /* @__PURE__ */ new WeakMap();
let Jt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Nt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (gt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = bt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && bt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Zt = (n) => new Jt(typeof n == "string" ? n : n + "", void 0, Nt), Ft = (n, t) => {
  gt ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = nt.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  });
}, wt = gt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return Zt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ct;
const rt = window, Et = rt.trustedTypes, qt = Et ? Et.emptyScript : "", Mt = rt.reactiveElementPolyfillSupport, _t = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? qt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, Rt = (n, t) => t !== n && (t == t || n == n), dt = { attribute: !0, type: String, converter: _t, reflect: !1, hasChanged: Rt }, mt = "finalized";
let I = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const s = this._$Ep(i, e);
      s !== void 0 && (this._$Ev.set(s, i), t.push(s));
    }), t;
  }
  static createProperty(t, e = dt) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const a = this[t];
      this[e] = s, this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || dt;
  }
  static finalize() {
    if (this.hasOwnProperty(mt))
      return !1;
    this[mt] = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(wt(s));
    } else
      t !== void 0 && e.push(wt(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Ft(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = dt) {
    var s;
    const a = this.constructor._$Ep(t, i);
    if (a !== void 0 && i.reflect === !0) {
      const r = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : _t).toAttribute(e, i.type);
      this._$El = t, r == null ? this.removeAttribute(a) : this.setAttribute(a, r), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, a = s._$Ev.get(t);
    if (a !== void 0 && this._$El !== a) {
      const r = s.getPropertyOptions(a), m = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((i = r.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? r.converter : _t;
      this._$El = a, this[a] = m.fromAttribute(e, r.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || Rt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, a) => this[a] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var a;
        return (a = s.hostUpdate) === null || a === void 0 ? void 0 : a.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
I[mt] = !0, I.elementProperties = /* @__PURE__ */ new Map(), I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, Mt == null || Mt({ ReactiveElement: I }), ((ct = rt.reactiveElementVersions) !== null && ct !== void 0 ? ct : rt.reactiveElementVersions = []).push("1.6.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var $t;
const ot = window, B = ot.trustedTypes, Ct = B ? B.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, yt = "$lit$", H = `lit$${(Math.random() + "").slice(9)}$`, jt = "?" + H, Kt = `<${jt}>`, L = document, K = () => L.createComment(""), G = (n) => n === null || typeof n != "object" && typeof n != "function", Lt = Array.isArray, Gt = (n) => Lt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", pt = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, Dt = />/g, R = RegExp(`>|${pt}(?:([^\\s"'>=/]+)(${pt}*=${pt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), xt = /'/g, Pt = /"/g, zt = /^(?:script|style|textarea|title)$/i, W = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), j = L.createTreeWalker(L, 129, null, !1), Qt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, a = t === 2 ? "<svg>" : "", r = F;
  for (let c = 0; c < e; c++) {
    const d = n[c];
    let C, v, g = -1, S = 0;
    for (; S < d.length && (r.lastIndex = S, v = r.exec(d), v !== null); )
      S = r.lastIndex, r === F ? v[1] === "!--" ? r = Ot : v[1] !== void 0 ? r = Dt : v[2] !== void 0 ? (zt.test(v[2]) && (s = RegExp("</" + v[2], "g")), r = R) : v[3] !== void 0 && (r = R) : r === R ? v[0] === ">" ? (r = s ?? F, g = -1) : v[1] === void 0 ? g = -2 : (g = r.lastIndex - v[2].length, C = v[1], r = v[3] === void 0 ? R : v[3] === '"' ? Pt : xt) : r === Pt || r === xt ? r = R : r === Ot || r === Dt ? r = F : (r = R, s = void 0);
    const x = r === R && n[c + 1].startsWith("/>") ? " " : "";
    a += r === F ? d + Kt : g >= 0 ? (i.push(C), d.slice(0, g) + yt + d.slice(g) + H + x) : d + H + (g === -2 ? (i.push(void 0), c) : x);
  }
  const m = a + (n[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Ct !== void 0 ? Ct.createHTML(m) : m, i];
};
class Q {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let a = 0, r = 0;
    const m = t.length - 1, c = this.parts, [d, C] = Qt(t, e);
    if (this.el = Q.createElement(d, i), j.currentNode = this.el.content, e === 2) {
      const v = this.el.content, g = v.firstChild;
      g.remove(), v.append(...g.childNodes);
    }
    for (; (s = j.nextNode()) !== null && c.length < m; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const v = [];
          for (const g of s.getAttributeNames())
            if (g.endsWith(yt) || g.startsWith(H)) {
              const S = C[r++];
              if (v.push(g), S !== void 0) {
                const x = s.getAttribute(S.toLowerCase() + yt).split(H), T = /([.?@])?(.*)/.exec(S);
                c.push({ type: 1, index: a, name: T[2], strings: x, ctor: T[1] === "." ? te : T[1] === "?" ? ie : T[1] === "@" ? se : at });
              } else
                c.push({ type: 6, index: a });
            }
          for (const g of v)
            s.removeAttribute(g);
        }
        if (zt.test(s.tagName)) {
          const v = s.textContent.split(H), g = v.length - 1;
          if (g > 0) {
            s.textContent = B ? B.emptyScript : "";
            for (let S = 0; S < g; S++)
              s.append(v[S], K()), j.nextNode(), c.push({ type: 2, index: ++a });
            s.append(v[g], K());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === jt)
          c.push({ type: 2, index: a });
        else {
          let v = -1;
          for (; (v = s.data.indexOf(H, v + 1)) !== -1; )
            c.push({ type: 7, index: a }), v += H.length - 1;
        }
      a++;
    }
  }
  static createElement(t, e) {
    const i = L.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Y(n, t, e = n, i) {
  var s, a, r, m;
  if (t === W)
    return t;
  let c = i !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[i] : e._$Cl;
  const d = G(t) ? void 0 : t._$litDirective$;
  return (c == null ? void 0 : c.constructor) !== d && ((a = c == null ? void 0 : c._$AO) === null || a === void 0 || a.call(c, !1), d === void 0 ? c = void 0 : (c = new d(n), c._$AT(n, e, i)), i !== void 0 ? ((r = (m = e)._$Co) !== null && r !== void 0 ? r : m._$Co = [])[i] = c : e._$Cl = c), c !== void 0 && (t = Y(n, c._$AS(n, t.values), c, i)), t;
}
class Xt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: i }, parts: s } = this._$AD, a = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : L).importNode(i, !0);
    j.currentNode = a;
    let r = j.nextNode(), m = 0, c = 0, d = s[0];
    for (; d !== void 0; ) {
      if (m === d.index) {
        let C;
        d.type === 2 ? C = new tt(r, r.nextSibling, this, t) : d.type === 1 ? C = new d.ctor(r, d.name, d.strings, this, t) : d.type === 6 && (C = new ne(r, this, t)), this._$AV.push(C), d = s[++c];
      }
      m !== (d == null ? void 0 : d.index) && (r = j.nextNode(), m++);
    }
    return j.currentNode = L, a;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class tt {
  constructor(t, e, i, s) {
    var a;
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cp = (a = s == null ? void 0 : s.isConnected) === null || a === void 0 || a;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = Y(this, t, e), G(t) ? t === E || t == null || t === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== W && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Gt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== E && G(this._$AH) ? this._$AA.nextSibling.data = t : this.$(L.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: s } = t, a = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Q.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === a)
      this._$AH.v(i);
    else {
      const r = new Xt(a, this), m = r.u(this.options);
      r.v(i), this.$(m), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Ht.get(t.strings);
    return e === void 0 && Ht.set(t.strings, e = new Q(t)), e;
  }
  T(t) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const a of t)
      s === e.length ? e.push(i = new tt(this.k(K()), this.k(K()), this, this.options)) : i = e[s], i._$AI(a), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class at {
  constructor(t, e, i, s, a) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = E;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const a = this.strings;
    let r = !1;
    if (a === void 0)
      t = Y(this, t, e, 0), r = !G(t) || t !== this._$AH && t !== W, r && (this._$AH = t);
    else {
      const m = t;
      let c, d;
      for (t = a[0], c = 0; c < a.length - 1; c++)
        d = Y(this, m[i + c], e, c), d === W && (d = this._$AH[c]), r || (r = !G(d) || d !== this._$AH[c]), d === E ? t = E : t !== E && (t += (d ?? "") + a[c + 1]), this._$AH[c] = d;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class te extends at {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === E ? void 0 : t;
  }
}
const ee = B ? B.emptyScript : "";
class ie extends at {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== E ? this.element.setAttribute(this.name, ee) : this.element.removeAttribute(this.name);
  }
}
class se extends at {
  constructor(t, e, i, s, a) {
    super(t, e, i, s, a), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = Y(this, t, e, 0)) !== null && i !== void 0 ? i : E) === W)
      return;
    const s = this._$AH, a = t === E && s !== E || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== E && (s === E || a);
    a && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class ne {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Y(this, t);
  }
}
const Tt = ot.litHtmlPolyfillSupport;
Tt == null || Tt(Q, tt), (($t = ot.litHtmlVersions) !== null && $t !== void 0 ? $t : ot.litHtmlVersions = []).push("2.7.4");
const re = (n, t, e) => {
  var i, s;
  const a = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let r = a._$litPart$;
  if (r === void 0) {
    const m = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    a._$litPart$ = r = new tt(t.insertBefore(K(), m), m, void 0, e ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ft, vt;
class q extends I {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = re(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return W;
  }
}
q.finalized = !0, q._$litElement$ = !0, (ft = globalThis.litElementHydrateSupport) === null || ft === void 0 || ft.call(globalThis, { LitElement: q });
const Ut = globalThis.litElementPolyfillSupport;
Ut == null || Ut({ LitElement: q });
((vt = globalThis.litElementVersions) !== null && vt !== void 0 ? vt : globalThis.litElementVersions = []).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oe = (n) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(n, t) : ((e, i) => {
  const { kind: s, elements: a } = i;
  return { kind: s, elements: a, finisher(r) {
    customElements.define(e, r);
  } };
})(n, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, n);
} }, le = (n, t, e) => {
  t.constructor.createProperty(e, n);
};
function At(n) {
  return (t, e) => e !== void 0 ? le(n, t, e) : ae(n, t);
}
var he = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ue(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var It = { exports: {} };
(function(n, t) {
  (function(e, i) {
    n.exports = i();
  })(he, function() {
    var e = 1e3, i = 6e4, s = 36e5, a = "millisecond", r = "second", m = "minute", c = "hour", d = "day", C = "week", v = "month", g = "quarter", S = "year", x = "date", T = "Invalid Date", Bt = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Wt = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Yt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function($) {
      var h = ["th", "st", "nd", "rd"], o = $ % 100;
      return "[" + $ + (h[(o - 20) % 10] || h[o] || h[0]) + "]";
    } }, ht = function($, h, o) {
      var u = String($);
      return !u || u.length >= h ? $ : "" + Array(h + 1 - u.length).join(o) + $;
    }, Vt = { s: ht, z: function($) {
      var h = -$.utcOffset(), o = Math.abs(h), u = Math.floor(o / 60), l = o % 60;
      return (h <= 0 ? "+" : "-") + ht(u, 2, "0") + ":" + ht(l, 2, "0");
    }, m: function $(h, o) {
      if (h.date() < o.date())
        return -$(o, h);
      var u = 12 * (o.year() - h.year()) + (o.month() - h.month()), l = h.clone().add(u, v), p = o - l < 0, f = h.clone().add(u + (p ? -1 : 1), v);
      return +(-(u + (o - l) / (p ? l - f : f - l)) || 0);
    }, a: function($) {
      return $ < 0 ? Math.ceil($) || 0 : Math.floor($);
    }, p: function($) {
      return { M: v, y: S, w: C, d, D: x, h: c, m, s: r, ms: a, Q: g }[$] || String($ || "").toLowerCase().replace(/s$/, "");
    }, u: function($) {
      return $ === void 0;
    } }, V = "en", U = {};
    U[V] = Yt;
    var ut = function($) {
      return $ instanceof it;
    }, et = function $(h, o, u) {
      var l;
      if (!h)
        return V;
      if (typeof h == "string") {
        var p = h.toLowerCase();
        U[p] && (l = p), o && (U[p] = o, l = p);
        var f = h.split("-");
        if (!l && f.length > 1)
          return $(f[0]);
      } else {
        var y = h.name;
        U[y] = h, l = y;
      }
      return !u && l && (V = l), l || !u && V;
    }, b = function($, h) {
      if (ut($))
        return $.clone();
      var o = typeof h == "object" ? h : {};
      return o.date = $, o.args = arguments, new it(o);
    }, _ = Vt;
    _.l = et, _.i = ut, _.w = function($, h) {
      return b($, { locale: h.$L, utc: h.$u, x: h.$x, $offset: h.$offset });
    };
    var it = function() {
      function $(o) {
        this.$L = et(o.locale, null, !0), this.parse(o);
      }
      var h = $.prototype;
      return h.parse = function(o) {
        this.$d = function(u) {
          var l = u.date, p = u.utc;
          if (l === null)
            return /* @__PURE__ */ new Date(NaN);
          if (_.u(l))
            return /* @__PURE__ */ new Date();
          if (l instanceof Date)
            return new Date(l);
          if (typeof l == "string" && !/Z$/i.test(l)) {
            var f = l.match(Bt);
            if (f) {
              var y = f[2] - 1 || 0, A = (f[7] || "0").substring(0, 3);
              return p ? new Date(Date.UTC(f[1], y, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, A)) : new Date(f[1], y, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, A);
            }
          }
          return new Date(l);
        }(o), this.$x = o.x || {}, this.init();
      }, h.init = function() {
        var o = this.$d;
        this.$y = o.getFullYear(), this.$M = o.getMonth(), this.$D = o.getDate(), this.$W = o.getDay(), this.$H = o.getHours(), this.$m = o.getMinutes(), this.$s = o.getSeconds(), this.$ms = o.getMilliseconds();
      }, h.$utils = function() {
        return _;
      }, h.isValid = function() {
        return this.$d.toString() !== T;
      }, h.isSame = function(o, u) {
        var l = b(o);
        return this.startOf(u) <= l && l <= this.endOf(u);
      }, h.isAfter = function(o, u) {
        return b(o) < this.startOf(u);
      }, h.isBefore = function(o, u) {
        return this.endOf(u) < b(o);
      }, h.$g = function(o, u, l) {
        return _.u(o) ? this[u] : this.set(l, o);
      }, h.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, h.valueOf = function() {
        return this.$d.getTime();
      }, h.startOf = function(o, u) {
        var l = this, p = !!_.u(u) || u, f = _.p(o), y = function(N, O) {
          var P = _.w(l.$u ? Date.UTC(l.$y, O, N) : new Date(l.$y, O, N), l);
          return p ? P : P.endOf(d);
        }, A = function(N, O) {
          return _.w(l.toDate()[N].apply(l.toDate("s"), (p ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(O)), l);
        }, w = this.$W, M = this.$M, D = this.$D, z = "set" + (this.$u ? "UTC" : "");
        switch (f) {
          case S:
            return p ? y(1, 0) : y(31, 11);
          case v:
            return p ? y(1, M) : y(0, M + 1);
          case C:
            var k = this.$locale().weekStart || 0, J = (w < k ? w + 7 : w) - k;
            return y(p ? D - J : D + (6 - J), M);
          case d:
          case x:
            return A(z + "Hours", 0);
          case c:
            return A(z + "Minutes", 1);
          case m:
            return A(z + "Seconds", 2);
          case r:
            return A(z + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, h.endOf = function(o) {
        return this.startOf(o, !1);
      }, h.$set = function(o, u) {
        var l, p = _.p(o), f = "set" + (this.$u ? "UTC" : ""), y = (l = {}, l[d] = f + "Date", l[x] = f + "Date", l[v] = f + "Month", l[S] = f + "FullYear", l[c] = f + "Hours", l[m] = f + "Minutes", l[r] = f + "Seconds", l[a] = f + "Milliseconds", l)[p], A = p === d ? this.$D + (u - this.$W) : u;
        if (p === v || p === S) {
          var w = this.clone().set(x, 1);
          w.$d[y](A), w.init(), this.$d = w.set(x, Math.min(this.$D, w.daysInMonth())).$d;
        } else
          y && this.$d[y](A);
        return this.init(), this;
      }, h.set = function(o, u) {
        return this.clone().$set(o, u);
      }, h.get = function(o) {
        return this[_.p(o)]();
      }, h.add = function(o, u) {
        var l, p = this;
        o = Number(o);
        var f = _.p(u), y = function(M) {
          var D = b(p);
          return _.w(D.date(D.date() + Math.round(M * o)), p);
        };
        if (f === v)
          return this.set(v, this.$M + o);
        if (f === S)
          return this.set(S, this.$y + o);
        if (f === d)
          return y(1);
        if (f === C)
          return y(7);
        var A = (l = {}, l[m] = i, l[c] = s, l[r] = e, l)[f] || 1, w = this.$d.getTime() + o * A;
        return _.w(w, this);
      }, h.subtract = function(o, u) {
        return this.add(-1 * o, u);
      }, h.format = function(o) {
        var u = this, l = this.$locale();
        if (!this.isValid())
          return l.invalidDate || T;
        var p = o || "YYYY-MM-DDTHH:mm:ssZ", f = _.z(this), y = this.$H, A = this.$m, w = this.$M, M = l.weekdays, D = l.months, z = l.meridiem, k = function(O, P, Z, st) {
          return O && (O[P] || O(u, p)) || Z[P].slice(0, st);
        }, J = function(O) {
          return _.s(y % 12 || 12, O, "0");
        }, N = z || function(O, P, Z) {
          var st = O < 12 ? "AM" : "PM";
          return Z ? st.toLowerCase() : st;
        };
        return p.replace(Wt, function(O, P) {
          return P || function(Z) {
            switch (Z) {
              case "YY":
                return String(u.$y).slice(-2);
              case "YYYY":
                return _.s(u.$y, 4, "0");
              case "M":
                return w + 1;
              case "MM":
                return _.s(w + 1, 2, "0");
              case "MMM":
                return k(l.monthsShort, w, D, 3);
              case "MMMM":
                return k(D, w);
              case "D":
                return u.$D;
              case "DD":
                return _.s(u.$D, 2, "0");
              case "d":
                return String(u.$W);
              case "dd":
                return k(l.weekdaysMin, u.$W, M, 2);
              case "ddd":
                return k(l.weekdaysShort, u.$W, M, 3);
              case "dddd":
                return M[u.$W];
              case "H":
                return String(y);
              case "HH":
                return _.s(y, 2, "0");
              case "h":
                return J(1);
              case "hh":
                return J(2);
              case "a":
                return N(y, A, !0);
              case "A":
                return N(y, A, !1);
              case "m":
                return String(A);
              case "mm":
                return _.s(A, 2, "0");
              case "s":
                return String(u.$s);
              case "ss":
                return _.s(u.$s, 2, "0");
              case "SSS":
                return _.s(u.$ms, 3, "0");
              case "Z":
                return f;
            }
            return null;
          }(O) || f.replace(":", "");
        });
      }, h.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, h.diff = function(o, u, l) {
        var p, f = this, y = _.p(u), A = b(o), w = (A.utcOffset() - this.utcOffset()) * i, M = this - A, D = function() {
          return _.m(f, A);
        };
        switch (y) {
          case S:
            p = D() / 12;
            break;
          case v:
            p = D();
            break;
          case g:
            p = D() / 3;
            break;
          case C:
            p = (M - w) / 6048e5;
            break;
          case d:
            p = (M - w) / 864e5;
            break;
          case c:
            p = M / s;
            break;
          case m:
            p = M / i;
            break;
          case r:
            p = M / e;
            break;
          default:
            p = M;
        }
        return l ? p : _.a(p);
      }, h.daysInMonth = function() {
        return this.endOf(v).$D;
      }, h.$locale = function() {
        return U[this.$L];
      }, h.locale = function(o, u) {
        if (!o)
          return this.$L;
        var l = this.clone(), p = et(o, u, !0);
        return p && (l.$L = p), l;
      }, h.clone = function() {
        return _.w(this.$d, this);
      }, h.toDate = function() {
        return new Date(this.valueOf());
      }, h.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, h.toISOString = function() {
        return this.$d.toISOString();
      }, h.toString = function() {
        return this.$d.toUTCString();
      }, $;
    }(), St = it.prototype;
    return b.prototype = St, [["$ms", a], ["$s", r], ["$m", m], ["$H", c], ["$W", d], ["$M", v], ["$y", S], ["$D", x]].forEach(function($) {
      St[$[1]] = function(h) {
        return this.$g(h, $[0], $[1]);
      };
    }), b.extend = function($, h) {
      return $.$i || ($(h, it, b), $.$i = !0), b;
    }, b.locale = et, b.isDayjs = ut, b.unix = function($) {
      return b(1e3 * $);
    }, b.en = U[V], b.Ls = U, b.p = {}, b;
  });
})(It);
var ce = It.exports;
const kt = /* @__PURE__ */ ue(ce);
var de = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, lt = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? $e(t, e) : t, a = n.length - 1, r; a >= 0; a--)
    (r = n[a]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && de(t, e, s), s;
};
let X = class extends q {
  createRenderRoot() {
    return this.shadow ? this.attachShadow({ mode: "open" }) : this;
  }
  render() {
    const n = kt.unix(new Date(this.date).getTime() / 1e3);
    return kt(n).format(this.format);
  }
};
lt([
  At()
], X.prototype, "date", 2);
lt([
  At()
], X.prototype, "format", 2);
lt([
  At()
], X.prototype, "shadow", 2);
X = lt([
  oe("date-time-primitive")
], X);
export {
  X as DateTimePrimitive
};
