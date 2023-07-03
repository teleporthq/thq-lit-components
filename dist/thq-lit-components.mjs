/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = window, St = rt.ShadowRoot && (rt.ShadyCSS === void 0 || rt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, jt = Symbol(), Et = /* @__PURE__ */ new WeakMap();
let qt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== jt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (St && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Et.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Et.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Kt = (n) => new qt(typeof n == "string" ? n : n + "", void 0, jt), Gt = (n, t) => {
  St ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = rt.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  });
}, Mt = St ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return Kt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var pt;
const ot = window, Ct = ot.trustedTypes, Qt = Ct ? Ct.emptyScript : "", Ot = ot.reactiveElementPolyfillSupport, yt = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Qt : null;
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
} }, Lt = (n, t) => t !== n && (t == t || n == n), $t = { attribute: !0, type: String, converter: yt, reflect: !1, hasChanged: Lt }, gt = "finalized";
let z = class extends HTMLElement {
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
  static createProperty(t, e = $t) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const o = this[t];
      this[e] = s, this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || $t;
  }
  static finalize() {
    if (this.hasOwnProperty(gt))
      return !1;
    this[gt] = !0;
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
        e.unshift(Mt(s));
    } else
      t !== void 0 && e.push(Mt(t));
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
    return Gt(e, this.constructor.elementStyles), e;
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
  _$EO(t, e, i = $t) {
    var s;
    const o = this.constructor._$Ep(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : yt).toAttribute(e, i.type);
      this._$El = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, o = s._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const r = s.getPropertyOptions(o), m = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((i = r.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? r.converter : yt;
      this._$El = o, this[o] = m.fromAttribute(e, r.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || Lt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
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
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var o;
        return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s);
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
z[gt] = !0, z.elementProperties = /* @__PURE__ */ new Map(), z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, Ot == null || Ot({ ReactiveElement: z }), ((pt = ot.reactiveElementVersions) !== null && pt !== void 0 ? pt : ot.reactiveElementVersions = []).push("1.6.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ft;
const at = window, W = at.trustedTypes, Dt = W ? W.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, At = "$lit$", H = `lit$${(Math.random() + "").slice(9)}$`, It = "?" + H, Xt = `<${It}>`, L = document, K = () => L.createComment(""), G = (n) => n === null || typeof n != "object" && typeof n != "function", zt = Array.isArray, te = (n) => zt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", vt = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xt = /-->/g, Pt = />/g, R = RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ht = /'/g, Tt = /"/g, Bt = /^(?:script|style|textarea|title)$/i, Y = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), Ut = /* @__PURE__ */ new WeakMap(), j = L.createTreeWalker(L, 129, null, !1), ee = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : "", r = q;
  for (let c = 0; c < e; c++) {
    const d = n[c];
    let C, v, g = -1, S = 0;
    for (; S < d.length && (r.lastIndex = S, v = r.exec(d), v !== null); )
      S = r.lastIndex, r === q ? v[1] === "!--" ? r = xt : v[1] !== void 0 ? r = Pt : v[2] !== void 0 ? (Bt.test(v[2]) && (s = RegExp("</" + v[2], "g")), r = R) : v[3] !== void 0 && (r = R) : r === R ? v[0] === ">" ? (r = s ?? q, g = -1) : v[1] === void 0 ? g = -2 : (g = r.lastIndex - v[2].length, C = v[1], r = v[3] === void 0 ? R : v[3] === '"' ? Tt : Ht) : r === Tt || r === Ht ? r = R : r === xt || r === Pt ? r = q : (r = R, s = void 0);
    const x = r === R && n[c + 1].startsWith("/>") ? " " : "";
    o += r === q ? d + Xt : g >= 0 ? (i.push(C), d.slice(0, g) + At + d.slice(g) + H + x) : d + H + (g === -2 ? (i.push(void 0), c) : x);
  }
  const m = o + (n[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Dt !== void 0 ? Dt.createHTML(m) : m, i];
};
class Q {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const m = t.length - 1, c = this.parts, [d, C] = ee(t, e);
    if (this.el = Q.createElement(d, i), j.currentNode = this.el.content, e === 2) {
      const v = this.el.content, g = v.firstChild;
      g.remove(), v.append(...g.childNodes);
    }
    for (; (s = j.nextNode()) !== null && c.length < m; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const v = [];
          for (const g of s.getAttributeNames())
            if (g.endsWith(At) || g.startsWith(H)) {
              const S = C[r++];
              if (v.push(g), S !== void 0) {
                const x = s.getAttribute(S.toLowerCase() + At).split(H), T = /([.?@])?(.*)/.exec(S);
                c.push({ type: 1, index: o, name: T[2], strings: x, ctor: T[1] === "." ? se : T[1] === "?" ? re : T[1] === "@" ? oe : ht });
              } else
                c.push({ type: 6, index: o });
            }
          for (const g of v)
            s.removeAttribute(g);
        }
        if (Bt.test(s.tagName)) {
          const v = s.textContent.split(H), g = v.length - 1;
          if (g > 0) {
            s.textContent = W ? W.emptyScript : "";
            for (let S = 0; S < g; S++)
              s.append(v[S], K()), j.nextNode(), c.push({ type: 2, index: ++o });
            s.append(v[g], K());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === It)
          c.push({ type: 2, index: o });
        else {
          let v = -1;
          for (; (v = s.data.indexOf(H, v + 1)) !== -1; )
            c.push({ type: 7, index: o }), v += H.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const i = L.createElement("template");
    return i.innerHTML = t, i;
  }
}
function V(n, t, e = n, i) {
  var s, o, r, m;
  if (t === Y)
    return t;
  let c = i !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[i] : e._$Cl;
  const d = G(t) ? void 0 : t._$litDirective$;
  return (c == null ? void 0 : c.constructor) !== d && ((o = c == null ? void 0 : c._$AO) === null || o === void 0 || o.call(c, !1), d === void 0 ? c = void 0 : (c = new d(n), c._$AT(n, e, i)), i !== void 0 ? ((r = (m = e)._$Co) !== null && r !== void 0 ? r : m._$Co = [])[i] = c : e._$Cl = c), c !== void 0 && (t = V(n, c._$AS(n, t.values), c, i)), t;
}
class ie {
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
    const { el: { content: i }, parts: s } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : L).importNode(i, !0);
    j.currentNode = o;
    let r = j.nextNode(), m = 0, c = 0, d = s[0];
    for (; d !== void 0; ) {
      if (m === d.index) {
        let C;
        d.type === 2 ? C = new tt(r, r.nextSibling, this, t) : d.type === 1 ? C = new d.ctor(r, d.name, d.strings, this, t) : d.type === 6 && (C = new ae(r, this, t)), this._$AV.push(C), d = s[++c];
      }
      m !== (d == null ? void 0 : d.index) && (r = j.nextNode(), m++);
    }
    return j.currentNode = L, o;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class tt {
  constructor(t, e, i, s) {
    var o;
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cp = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o;
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
    t = V(this, t, e), G(t) ? t === E || t == null || t === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== Y && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : te(t) ? this.T(t) : this._(t);
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
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Q.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.v(i);
    else {
      const r = new ie(o, this), m = r.u(this.options);
      r.v(i), this.$(m), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Ut.get(t.strings);
    return e === void 0 && Ut.set(t.strings, e = new Q(t)), e;
  }
  T(t) {
    zt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t)
      s === e.length ? e.push(i = new tt(this.k(K()), this.k(K()), this, this.options)) : i = e[s], i._$AI(o), s++;
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
class ht {
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = E;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0)
      t = V(this, t, e, 0), r = !G(t) || t !== this._$AH && t !== Y, r && (this._$AH = t);
    else {
      const m = t;
      let c, d;
      for (t = o[0], c = 0; c < o.length - 1; c++)
        d = V(this, m[i + c], e, c), d === Y && (d = this._$AH[c]), r || (r = !G(d) || d !== this._$AH[c]), d === E ? t = E : t !== E && (t += (d ?? "") + o[c + 1]), this._$AH[c] = d;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class se extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === E ? void 0 : t;
  }
}
const ne = W ? W.emptyScript : "";
class re extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== E ? this.element.setAttribute(this.name, ne) : this.element.removeAttribute(this.name);
  }
}
class oe extends ht {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = V(this, t, e, 0)) !== null && i !== void 0 ? i : E) === Y)
      return;
    const s = this._$AH, o = t === E && s !== E || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== E && (s === E || o);
    o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class ae {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const Nt = at.litHtmlPolyfillSupport;
Nt == null || Nt(Q, tt), ((ft = at.litHtmlVersions) !== null && ft !== void 0 ? ft : at.litHtmlVersions = []).push("2.7.4");
const le = (n, t, e) => {
  var i, s;
  const o = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let r = o._$litPart$;
  if (r === void 0) {
    const m = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    o._$litPart$ = r = new tt(t.insertBefore(K(), m), m, void 0, e ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _t, mt;
class B extends z {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = le(e, this.renderRoot, this.renderOptions);
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
    return Y;
  }
}
B.finalized = !0, B._$litElement$ = !0, (_t = globalThis.litElementHydrateSupport) === null || _t === void 0 || _t.call(globalThis, { LitElement: B });
const kt = globalThis.litElementPolyfillSupport;
kt == null || kt({ LitElement: B });
((mt = globalThis.litElementVersions) !== null && mt !== void 0 ? mt : globalThis.litElementVersions = []).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = (n) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(n, t) : ((e, i) => {
  const { kind: s, elements: o } = i;
  return { kind: s, elements: o, finisher(r) {
    customElements.define(e, r);
  } };
})(n, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, n);
} }, ue = (n, t, e) => {
  t.constructor.createProperty(e, n);
};
function et(n) {
  return (t, e) => e !== void 0 ? ue(n, t, e) : he(n, t);
}
var ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function de(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Yt = { exports: {} };
(function(n, t) {
  (function(e, i) {
    n.exports = i();
  })(ce, function() {
    var e = 1e3, i = 6e4, s = 36e5, o = "millisecond", r = "second", m = "minute", c = "hour", d = "day", C = "week", v = "month", g = "quarter", S = "year", x = "date", T = "Invalid Date", Vt = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Ft = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Jt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(p) {
      var h = ["th", "st", "nd", "rd"], a = p % 100;
      return "[" + p + (h[(a - 20) % 10] || h[a] || h[0]) + "]";
    } }, ct = function(p, h, a) {
      var u = String(p);
      return !u || u.length >= h ? p : "" + Array(h + 1 - u.length).join(a) + p;
    }, Zt = { s: ct, z: function(p) {
      var h = -p.utcOffset(), a = Math.abs(h), u = Math.floor(a / 60), l = a % 60;
      return (h <= 0 ? "+" : "-") + ct(u, 2, "0") + ":" + ct(l, 2, "0");
    }, m: function p(h, a) {
      if (h.date() < a.date())
        return -p(a, h);
      var u = 12 * (a.year() - h.year()) + (a.month() - h.month()), l = h.clone().add(u, v), $ = a - l < 0, f = h.clone().add(u + ($ ? -1 : 1), v);
      return +(-(u + (a - l) / ($ ? l - f : f - l)) || 0);
    }, a: function(p) {
      return p < 0 ? Math.ceil(p) || 0 : Math.floor(p);
    }, p: function(p) {
      return { M: v, y: S, w: C, d, D: x, h: c, m, s: r, ms: o, Q: g }[p] || String(p || "").toLowerCase().replace(/s$/, "");
    }, u: function(p) {
      return p === void 0;
    } }, F = "en", U = {};
    U[F] = Jt;
    var dt = function(p) {
      return p instanceof st;
    }, it = function p(h, a, u) {
      var l;
      if (!h)
        return F;
      if (typeof h == "string") {
        var $ = h.toLowerCase();
        U[$] && (l = $), a && (U[$] = a, l = $);
        var f = h.split("-");
        if (!l && f.length > 1)
          return p(f[0]);
      } else {
        var y = h.name;
        U[y] = h, l = y;
      }
      return !u && l && (F = l), l || !u && F;
    }, w = function(p, h) {
      if (dt(p))
        return p.clone();
      var a = typeof h == "object" ? h : {};
      return a.date = p, a.args = arguments, new st(a);
    }, _ = Zt;
    _.l = it, _.i = dt, _.w = function(p, h) {
      return w(p, { locale: h.$L, utc: h.$u, x: h.$x, $offset: h.$offset });
    };
    var st = function() {
      function p(a) {
        this.$L = it(a.locale, null, !0), this.parse(a);
      }
      var h = p.prototype;
      return h.parse = function(a) {
        this.$d = function(u) {
          var l = u.date, $ = u.utc;
          if (l === null)
            return /* @__PURE__ */ new Date(NaN);
          if (_.u(l))
            return /* @__PURE__ */ new Date();
          if (l instanceof Date)
            return new Date(l);
          if (typeof l == "string" && !/Z$/i.test(l)) {
            var f = l.match(Vt);
            if (f) {
              var y = f[2] - 1 || 0, A = (f[7] || "0").substring(0, 3);
              return $ ? new Date(Date.UTC(f[1], y, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, A)) : new Date(f[1], y, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, A);
            }
          }
          return new Date(l);
        }(a), this.$x = a.x || {}, this.init();
      }, h.init = function() {
        var a = this.$d;
        this.$y = a.getFullYear(), this.$M = a.getMonth(), this.$D = a.getDate(), this.$W = a.getDay(), this.$H = a.getHours(), this.$m = a.getMinutes(), this.$s = a.getSeconds(), this.$ms = a.getMilliseconds();
      }, h.$utils = function() {
        return _;
      }, h.isValid = function() {
        return this.$d.toString() !== T;
      }, h.isSame = function(a, u) {
        var l = w(a);
        return this.startOf(u) <= l && l <= this.endOf(u);
      }, h.isAfter = function(a, u) {
        return w(a) < this.startOf(u);
      }, h.isBefore = function(a, u) {
        return this.endOf(u) < w(a);
      }, h.$g = function(a, u, l) {
        return _.u(a) ? this[u] : this.set(l, a);
      }, h.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, h.valueOf = function() {
        return this.$d.getTime();
      }, h.startOf = function(a, u) {
        var l = this, $ = !!_.u(u) || u, f = _.p(a), y = function(k, O) {
          var P = _.w(l.$u ? Date.UTC(l.$y, O, k) : new Date(l.$y, O, k), l);
          return $ ? P : P.endOf(d);
        }, A = function(k, O) {
          return _.w(l.toDate()[k].apply(l.toDate("s"), ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(O)), l);
        }, b = this.$W, M = this.$M, D = this.$D, I = "set" + (this.$u ? "UTC" : "");
        switch (f) {
          case S:
            return $ ? y(1, 0) : y(31, 11);
          case v:
            return $ ? y(1, M) : y(0, M + 1);
          case C:
            var N = this.$locale().weekStart || 0, J = (b < N ? b + 7 : b) - N;
            return y($ ? D - J : D + (6 - J), M);
          case d:
          case x:
            return A(I + "Hours", 0);
          case c:
            return A(I + "Minutes", 1);
          case m:
            return A(I + "Seconds", 2);
          case r:
            return A(I + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, h.endOf = function(a) {
        return this.startOf(a, !1);
      }, h.$set = function(a, u) {
        var l, $ = _.p(a), f = "set" + (this.$u ? "UTC" : ""), y = (l = {}, l[d] = f + "Date", l[x] = f + "Date", l[v] = f + "Month", l[S] = f + "FullYear", l[c] = f + "Hours", l[m] = f + "Minutes", l[r] = f + "Seconds", l[o] = f + "Milliseconds", l)[$], A = $ === d ? this.$D + (u - this.$W) : u;
        if ($ === v || $ === S) {
          var b = this.clone().set(x, 1);
          b.$d[y](A), b.init(), this.$d = b.set(x, Math.min(this.$D, b.daysInMonth())).$d;
        } else
          y && this.$d[y](A);
        return this.init(), this;
      }, h.set = function(a, u) {
        return this.clone().$set(a, u);
      }, h.get = function(a) {
        return this[_.p(a)]();
      }, h.add = function(a, u) {
        var l, $ = this;
        a = Number(a);
        var f = _.p(u), y = function(M) {
          var D = w($);
          return _.w(D.date(D.date() + Math.round(M * a)), $);
        };
        if (f === v)
          return this.set(v, this.$M + a);
        if (f === S)
          return this.set(S, this.$y + a);
        if (f === d)
          return y(1);
        if (f === C)
          return y(7);
        var A = (l = {}, l[m] = i, l[c] = s, l[r] = e, l)[f] || 1, b = this.$d.getTime() + a * A;
        return _.w(b, this);
      }, h.subtract = function(a, u) {
        return this.add(-1 * a, u);
      }, h.format = function(a) {
        var u = this, l = this.$locale();
        if (!this.isValid())
          return l.invalidDate || T;
        var $ = a || "YYYY-MM-DDTHH:mm:ssZ", f = _.z(this), y = this.$H, A = this.$m, b = this.$M, M = l.weekdays, D = l.months, I = l.meridiem, N = function(O, P, Z, nt) {
          return O && (O[P] || O(u, $)) || Z[P].slice(0, nt);
        }, J = function(O) {
          return _.s(y % 12 || 12, O, "0");
        }, k = I || function(O, P, Z) {
          var nt = O < 12 ? "AM" : "PM";
          return Z ? nt.toLowerCase() : nt;
        };
        return $.replace(Ft, function(O, P) {
          return P || function(Z) {
            switch (Z) {
              case "YY":
                return String(u.$y).slice(-2);
              case "YYYY":
                return _.s(u.$y, 4, "0");
              case "M":
                return b + 1;
              case "MM":
                return _.s(b + 1, 2, "0");
              case "MMM":
                return N(l.monthsShort, b, D, 3);
              case "MMMM":
                return N(D, b);
              case "D":
                return u.$D;
              case "DD":
                return _.s(u.$D, 2, "0");
              case "d":
                return String(u.$W);
              case "dd":
                return N(l.weekdaysMin, u.$W, M, 2);
              case "ddd":
                return N(l.weekdaysShort, u.$W, M, 3);
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
                return k(y, A, !0);
              case "A":
                return k(y, A, !1);
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
      }, h.diff = function(a, u, l) {
        var $, f = this, y = _.p(u), A = w(a), b = (A.utcOffset() - this.utcOffset()) * i, M = this - A, D = function() {
          return _.m(f, A);
        };
        switch (y) {
          case S:
            $ = D() / 12;
            break;
          case v:
            $ = D();
            break;
          case g:
            $ = D() / 3;
            break;
          case C:
            $ = (M - b) / 6048e5;
            break;
          case d:
            $ = (M - b) / 864e5;
            break;
          case c:
            $ = M / s;
            break;
          case m:
            $ = M / i;
            break;
          case r:
            $ = M / e;
            break;
          default:
            $ = M;
        }
        return l ? $ : _.a($);
      }, h.daysInMonth = function() {
        return this.endOf(v).$D;
      }, h.$locale = function() {
        return U[this.$L];
      }, h.locale = function(a, u) {
        if (!a)
          return this.$L;
        var l = this.clone(), $ = it(a, u, !0);
        return $ && (l.$L = $), l;
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
      }, p;
    }(), bt = st.prototype;
    return w.prototype = bt, [["$ms", o], ["$s", r], ["$m", m], ["$H", c], ["$W", d], ["$M", v], ["$y", S], ["$D", x]].forEach(function(p) {
      bt[p[1]] = function(h) {
        return this.$g(h, p[0], p[1]);
      };
    }), w.extend = function(p, h) {
      return p.$i || (p(h, st, w), p.$i = !0), w;
    }, w.locale = it, w.isDayjs = dt, w.unix = function(p) {
      return w(1e3 * p);
    }, w.en = U[F], w.Ls = U, w.p = {}, w;
  });
})(Yt);
var pe = Yt.exports;
const Rt = /* @__PURE__ */ de(pe);
var $e = Object.defineProperty, fe = Object.getOwnPropertyDescriptor, ut = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? fe(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && $e(t, e, s), s;
};
let X = class extends B {
  createRenderRoot() {
    return this.shadow ? this.attachShadow({ mode: "open" }) : this;
  }
  render() {
    const n = Rt.unix(new Date(this.date).getTime() / 1e3);
    return Rt(n).format(this.format);
  }
};
ut([
  et()
], X.prototype, "date", 2);
ut([
  et()
], X.prototype, "format", 2);
ut([
  et()
], X.prototype, "shadow", 2);
X = ut([
  Wt("date-time-primitive")
], X);
var ve = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, wt = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? _e(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && ve(t, e, s), s;
};
let lt = class extends B {
  createRenderRoot() {
    return this.shadow ? this.attachShadow({ mode: "open" }) : this;
  }
  connectedCallback() {
    super.connectedCallback();
    const n = document.createRange().createContextualFragment(this.html);
    window.addEventListener("load", () => {
      if (this.shadow) {
        this.shadowRoot.append(n);
        return;
      }
      this.style.display = "contents", this.append(n);
    });
  }
};
wt([
  et()
], lt.prototype, "html", 2);
wt([
  et()
], lt.prototype, "shadow", 2);
lt = wt([
  Wt("dangerous-html")
], lt);
export {
  lt as DangerousHTML,
  X as DateTimePrimitive
};
