(function(P,T){typeof exports=="object"&&typeof module<"u"?T(exports):typeof define=="function"&&define.amd?define(["exports"],T):(P=typeof globalThis<"u"?globalThis:P||self,T(P.DateTimePrimitive={}))})(this,function(P){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=window,ht=T.ShadowRoot&&(T.ShadyCSS===void 0||T.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,St=Symbol(),bt=new WeakMap;let Wt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==St)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ht&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=bt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&bt.set(e,t))}return t}toString(){return this.cssText}};const Vt=n=>new Wt(typeof n=="string"?n:n+"",void 0,St),Yt=(n,t)=>{ht?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=T.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)})},wt=ht?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Vt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ut;const it=window,Et=it.trustedTypes,Zt=Et?Et.emptyScript:"",Mt=it.reactiveElementPolyfillSupport,ct={toAttribute(n,t){switch(t){case Boolean:n=n?Zt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Ct=(n,t)=>t!==n&&(t==t||n==n),dt={attribute:!0,type:String,converter:ct,reflect:!1,hasChanged:Ct},$t="finalized";let B=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);s!==void 0&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const a=this[t];this[e]=s,this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||dt}static finalize(){if(this.hasOwnProperty($t))return!1;this[$t]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(wt(s))}else t!==void 0&&e.push(wt(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Yt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=dt){var s;const a=this.constructor._$Ep(t,i);if(a!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:ct).toAttribute(e,i.type);this._$El=t,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,a=s._$Ev.get(t);if(a!==void 0&&this._$El!==a){const r=s.getPropertyOptions(a),_=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:ct;this._$El=a,this[a]=_.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||Ct)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,a)=>this[a]=s),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var a;return(a=s.hostUpdate)===null||a===void 0?void 0:a.call(s)}),this.update(i)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};B[$t]=!0,B.elementProperties=new Map,B.elementStyles=[],B.shadowRootOptions={mode:"open"},Mt==null||Mt({ReactiveElement:B}),((ut=it.reactiveElementVersions)!==null&&ut!==void 0?ut:it.reactiveElementVersions=[]).push("1.6.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pt;const st=window,W=st.trustedTypes,Dt=W?W.createPolicy("lit-html",{createHTML:n=>n}):void 0,ft="$lit$",H=`lit$${(Math.random()+"").slice(9)}$`,Ot="?"+H,Jt=`<${Ot}>`,k=document,J=()=>k.createComment(""),F=n=>n===null||typeof n!="object"&&typeof n!="function",Pt=Array.isArray,Ft=n=>Pt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",vt=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tt=/-->/g,Ht=/>/g,N=RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,Ut=/"/g,kt=/^(?:script|style|textarea|title)$/i,V=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),Nt=new WeakMap,R=k.createTreeWalker(k,129,null,!1);function Rt(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Dt!==void 0?Dt.createHTML(t):t}const qt=(n,t)=>{const e=n.length-1,i=[];let s,a=t===2?"<svg>":"",r=q;for(let _=0;_<e;_++){const c=n[_];let f,y,v=-1,S=0;for(;S<c.length&&(r.lastIndex=S,y=r.exec(c),y!==null);)S=r.lastIndex,r===q?y[1]==="!--"?r=Tt:y[1]!==void 0?r=Ht:y[2]!==void 0?(kt.test(y[2])&&(s=RegExp("</"+y[2],"g")),r=N):y[3]!==void 0&&(r=N):r===N?y[0]===">"?(r=s??q,v=-1):y[1]===void 0?v=-2:(v=r.lastIndex-y[2].length,f=y[1],r=y[3]===void 0?N:y[3]==='"'?Ut:xt):r===Ut||r===xt?r=N:r===Tt||r===Ht?r=q:(r=N,s=void 0);const b=r===N&&n[_+1].startsWith("/>")?" ":"";a+=r===q?c+Jt:v>=0?(i.push(f),c.slice(0,v)+ft+c.slice(v)+H+b):c+H+(v===-2?(i.push(void 0),_):b)}return[Rt(n,a+(n[e]||"<?>")+(t===2?"</svg>":"")),i]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0;const _=t.length-1,c=this.parts,[f,y]=qt(t,e);if(this.el=K.createElement(f,i),R.currentNode=this.el.content,e===2){const v=this.el.content,S=v.firstChild;S.remove(),v.append(...S.childNodes)}for(;(s=R.nextNode())!==null&&c.length<_;){if(s.nodeType===1){if(s.hasAttributes()){const v=[];for(const S of s.getAttributeNames())if(S.endsWith(ft)||S.startsWith(H)){const b=y[r++];if(v.push(S),b!==void 0){const x=s.getAttribute(b.toLowerCase()+ft).split(H),j=/([.?@])?(.*)/.exec(b);c.push({type:1,index:a,name:j[2],strings:x,ctor:j[1]==="."?Gt:j[1]==="?"?Xt:j[1]==="@"?te:nt})}else c.push({type:6,index:a})}for(const S of v)s.removeAttribute(S)}if(kt.test(s.tagName)){const v=s.textContent.split(H),S=v.length-1;if(S>0){s.textContent=W?W.emptyScript:"";for(let b=0;b<S;b++)s.append(v[b],J()),R.nextNode(),c.push({type:2,index:++a});s.append(v[S],J())}}}else if(s.nodeType===8)if(s.data===Ot)c.push({type:2,index:a});else{let v=-1;for(;(v=s.data.indexOf(H,v+1))!==-1;)c.push({type:7,index:a}),v+=H.length-1}a++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function Y(n,t,e=n,i){var s,a,r,_;if(t===V)return t;let c=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const f=F(t)?void 0:t._$litDirective$;return(c==null?void 0:c.constructor)!==f&&((a=c==null?void 0:c._$AO)===null||a===void 0||a.call(c,!1),f===void 0?c=void 0:(c=new f(n),c._$AT(n,e,i)),i!==void 0?((r=(_=e)._$Co)!==null&&r!==void 0?r:_._$Co=[])[i]=c:e._$Cl=c),c!==void 0&&(t=Y(n,c._$AS(n,t.values),c,i)),t}class Kt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,a=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:k).importNode(i,!0);R.currentNode=a;let r=R.nextNode(),_=0,c=0,f=s[0];for(;f!==void 0;){if(_===f.index){let y;f.type===2?y=new G(r,r.nextSibling,this,t):f.type===1?y=new f.ctor(r,f.name,f.strings,this,t):f.type===6&&(y=new ee(r,this,t)),this._$AV.push(y),f=s[++c]}_!==(f==null?void 0:f.index)&&(r=R.nextNode(),_++)}return R.currentNode=k,a}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{constructor(t,e,i,s){var a;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(a=s==null?void 0:s.isConnected)===null||a===void 0||a}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),F(t)?t===w||t==null||t===""?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==V&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Ft(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==w&&F(this._$AH)?this._$AA.nextSibling.data=t:this.$(k.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,a=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=K.createElement(Rt(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===a)this._$AH.v(i);else{const r=new Kt(a,this),_=r.u(this.options);r.v(i),this.$(_),this._$AH=r}}_$AC(t){let e=Nt.get(t.strings);return e===void 0&&Nt.set(t.strings,e=new K(t)),e}T(t){Pt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new G(this.k(J()),this.k(J()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class nt{constructor(t,e,i,s,a){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=w}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const a=this.strings;let r=!1;if(a===void 0)t=Y(this,t,e,0),r=!F(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const _=t;let c,f;for(t=a[0],c=0;c<a.length-1;c++)f=Y(this,_[i+c],e,c),f===V&&(f=this._$AH[c]),r||(r=!F(f)||f!==this._$AH[c]),f===w?t=w:t!==w&&(t+=(f??"")+a[c+1]),this._$AH[c]=f}r&&!s&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Gt extends nt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}}const Qt=W?W.emptyScript:"";class Xt extends nt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==w?this.element.setAttribute(this.name,Qt):this.element.removeAttribute(this.name)}}class te extends nt{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){var i;if((t=(i=Y(this,t,e,0))!==null&&i!==void 0?i:w)===V)return;const s=this._$AH,a=t===w&&s!==w||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==w&&(s===w||a);a&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class ee{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const jt=st.litHtmlPolyfillSupport;jt==null||jt(K,G),((pt=st.litHtmlVersions)!==null&&pt!==void 0?pt:st.litHtmlVersions=[]).push("2.7.5");const ie=(n,t,e)=>{var i,s;const a=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let r=a._$litPart$;if(r===void 0){const _=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;a._$litPart$=r=new G(t.insertBefore(J(),_),_,void 0,e??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var _t,mt;class Q extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ie(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return V}}Q.finalized=!0,Q._$litElement$=!0,(_t=globalThis.litElementHydrateSupport)===null||_t===void 0||_t.call(globalThis,{LitElement:Q});const Lt=globalThis.litElementPolyfillSupport;Lt==null||Lt({LitElement:Q}),((mt=globalThis.litElementVersions)!==null&&mt!==void 0?mt:globalThis.litElementVersions=[]).push("3.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const se=n=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(n,t):((e,i)=>{const{kind:s,elements:a}=i;return{kind:s,elements:a,finisher(r){customElements.define(e,r)}}})(n,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=(n,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,n)}},re=(n,t,e)=>{t.constructor.createProperty(e,n)};function yt(n){return(t,e)=>e!==void 0?re(n,t,e):ne(n,t)}var oe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ae(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var zt={exports:{}};(function(n,t){(function(e,i){n.exports=i()})(oe,function(){var e=1e3,i=6e4,s=36e5,a="millisecond",r="second",_="minute",c="hour",f="day",y="week",v="month",S="quarter",b="year",x="date",j="Invalid Date",ce=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,de=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$e={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(d){var h=["th","st","nd","rd"],o=d%100;return"["+d+(h[(o-20)%10]||h[o]||h[0])+"]"}},gt=function(d,h,o){var u=String(d);return!u||u.length>=h?d:""+Array(h+1-u.length).join(o)+d},pe={s:gt,z:function(d){var h=-d.utcOffset(),o=Math.abs(h),u=Math.floor(o/60),l=o%60;return(h<=0?"+":"-")+gt(u,2,"0")+":"+gt(l,2,"0")},m:function d(h,o){if(h.date()<o.date())return-d(o,h);var u=12*(o.year()-h.year())+(o.month()-h.month()),l=h.clone().add(u,v),$=o-l<0,p=h.clone().add(u+($?-1:1),v);return+(-(u+(o-l)/($?l-p:p-l))||0)},a:function(d){return d<0?Math.ceil(d)||0:Math.floor(d)},p:function(d){return{M:v,y:b,w:y,d:f,D:x,h:c,m:_,s:r,ms:a,Q:S}[d]||String(d||"").toLowerCase().replace(/s$/,"")},u:function(d){return d===void 0}},X="en",L={};L[X]=$e;var At=function(d){return d instanceof at},ot=function d(h,o,u){var l;if(!h)return X;if(typeof h=="string"){var $=h.toLowerCase();L[$]&&(l=$),o&&(L[$]=o,l=$);var p=h.split("-");if(!l&&p.length>1)return d(p[0])}else{var g=h.name;L[g]=h,l=g}return!u&&l&&(X=l),l||!u&&X},E=function(d,h){if(At(d))return d.clone();var o=typeof h=="object"?h:{};return o.date=d,o.args=arguments,new at(o)},m=pe;m.l=ot,m.i=At,m.w=function(d,h){return E(d,{locale:h.$L,utc:h.$u,x:h.$x,$offset:h.$offset})};var at=function(){function d(o){this.$L=ot(o.locale,null,!0),this.parse(o)}var h=d.prototype;return h.parse=function(o){this.$d=function(u){var l=u.date,$=u.utc;if(l===null)return new Date(NaN);if(m.u(l))return new Date;if(l instanceof Date)return new Date(l);if(typeof l=="string"&&!/Z$/i.test(l)){var p=l.match(ce);if(p){var g=p[2]-1||0,A=(p[7]||"0").substring(0,3);return $?new Date(Date.UTC(p[1],g,p[3]||1,p[4]||0,p[5]||0,p[6]||0,A)):new Date(p[1],g,p[3]||1,p[4]||0,p[5]||0,p[6]||0,A)}}return new Date(l)}(o),this.$x=o.x||{},this.init()},h.init=function(){var o=this.$d;this.$y=o.getFullYear(),this.$M=o.getMonth(),this.$D=o.getDate(),this.$W=o.getDay(),this.$H=o.getHours(),this.$m=o.getMinutes(),this.$s=o.getSeconds(),this.$ms=o.getMilliseconds()},h.$utils=function(){return m},h.isValid=function(){return this.$d.toString()!==j},h.isSame=function(o,u){var l=E(o);return this.startOf(u)<=l&&l<=this.endOf(u)},h.isAfter=function(o,u){return E(o)<this.startOf(u)},h.isBefore=function(o,u){return this.endOf(u)<E(o)},h.$g=function(o,u,l){return m.u(o)?this[u]:this.set(l,o)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(o,u){var l=this,$=!!m.u(u)||u,p=m.p(o),g=function(I,D){var U=m.w(l.$u?Date.UTC(l.$y,D,I):new Date(l.$y,D,I),l);return $?U:U.endOf(f)},A=function(I,D){return m.w(l.toDate()[I].apply(l.toDate("s"),($?[0,0,0,0]:[23,59,59,999]).slice(D)),l)},M=this.$W,C=this.$M,O=this.$D,Z="set"+(this.$u?"UTC":"");switch(p){case b:return $?g(1,0):g(31,11);case v:return $?g(1,C):g(0,C+1);case y:var z=this.$locale().weekStart||0,tt=(M<z?M+7:M)-z;return g($?O-tt:O+(6-tt),C);case f:case x:return A(Z+"Hours",0);case c:return A(Z+"Minutes",1);case _:return A(Z+"Seconds",2);case r:return A(Z+"Milliseconds",3);default:return this.clone()}},h.endOf=function(o){return this.startOf(o,!1)},h.$set=function(o,u){var l,$=m.p(o),p="set"+(this.$u?"UTC":""),g=(l={},l[f]=p+"Date",l[x]=p+"Date",l[v]=p+"Month",l[b]=p+"FullYear",l[c]=p+"Hours",l[_]=p+"Minutes",l[r]=p+"Seconds",l[a]=p+"Milliseconds",l)[$],A=$===f?this.$D+(u-this.$W):u;if($===v||$===b){var M=this.clone().set(x,1);M.$d[g](A),M.init(),this.$d=M.set(x,Math.min(this.$D,M.daysInMonth())).$d}else g&&this.$d[g](A);return this.init(),this},h.set=function(o,u){return this.clone().$set(o,u)},h.get=function(o){return this[m.p(o)]()},h.add=function(o,u){var l,$=this;o=Number(o);var p=m.p(u),g=function(C){var O=E($);return m.w(O.date(O.date()+Math.round(C*o)),$)};if(p===v)return this.set(v,this.$M+o);if(p===b)return this.set(b,this.$y+o);if(p===f)return g(1);if(p===y)return g(7);var A=(l={},l[_]=i,l[c]=s,l[r]=e,l)[p]||1,M=this.$d.getTime()+o*A;return m.w(M,this)},h.subtract=function(o,u){return this.add(-1*o,u)},h.format=function(o){var u=this,l=this.$locale();if(!this.isValid())return l.invalidDate||j;var $=o||"YYYY-MM-DDTHH:mm:ssZ",p=m.z(this),g=this.$H,A=this.$m,M=this.$M,C=l.weekdays,O=l.months,Z=l.meridiem,z=function(D,U,et,lt){return D&&(D[U]||D(u,$))||et[U].slice(0,lt)},tt=function(D){return m.s(g%12||12,D,"0")},I=Z||function(D,U,et){var lt=D<12?"AM":"PM";return et?lt.toLowerCase():lt};return $.replace(de,function(D,U){return U||function(et){switch(et){case"YY":return String(u.$y).slice(-2);case"YYYY":return m.s(u.$y,4,"0");case"M":return M+1;case"MM":return m.s(M+1,2,"0");case"MMM":return z(l.monthsShort,M,O,3);case"MMMM":return z(O,M);case"D":return u.$D;case"DD":return m.s(u.$D,2,"0");case"d":return String(u.$W);case"dd":return z(l.weekdaysMin,u.$W,C,2);case"ddd":return z(l.weekdaysShort,u.$W,C,3);case"dddd":return C[u.$W];case"H":return String(g);case"HH":return m.s(g,2,"0");case"h":return tt(1);case"hh":return tt(2);case"a":return I(g,A,!0);case"A":return I(g,A,!1);case"m":return String(A);case"mm":return m.s(A,2,"0");case"s":return String(u.$s);case"ss":return m.s(u.$s,2,"0");case"SSS":return m.s(u.$ms,3,"0");case"Z":return p}return null}(D)||p.replace(":","")})},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(o,u,l){var $,p=this,g=m.p(u),A=E(o),M=(A.utcOffset()-this.utcOffset())*i,C=this-A,O=function(){return m.m(p,A)};switch(g){case b:$=O()/12;break;case v:$=O();break;case S:$=O()/3;break;case y:$=(C-M)/6048e5;break;case f:$=(C-M)/864e5;break;case c:$=C/s;break;case _:$=C/i;break;case r:$=C/e;break;default:$=C}return l?$:m.a($)},h.daysInMonth=function(){return this.endOf(v).$D},h.$locale=function(){return L[this.$L]},h.locale=function(o,u){if(!o)return this.$L;var l=this.clone(),$=ot(o,u,!0);return $&&(l.$L=$),l},h.clone=function(){return m.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},d}(),Bt=at.prototype;return E.prototype=Bt,[["$ms",a],["$s",r],["$m",_],["$H",c],["$W",f],["$M",v],["$y",b],["$D",x]].forEach(function(d){Bt[d[1]]=function(h){return this.$g(h,d[0],d[1])}}),E.extend=function(d,h){return d.$i||(d(h,at,E),d.$i=!0),E},E.locale=ot,E.isDayjs=At,E.unix=function(d){return E(1e3*d)},E.en=L[X],E.Ls=L,E.p={},E})})(zt);var le=zt.exports;const It=ae(le);var he=Object.defineProperty,ue=Object.getOwnPropertyDescriptor,rt=(n,t,e,i)=>{for(var s=i>1?void 0:i?ue(t,e):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(s=(i?r(t,e,s):r(s))||s);return i&&s&&he(t,e,s),s};P.DateTimePrimitive=class extends Q{createRenderRoot(){return this.shadow?this.attachShadow({mode:"open"}):this}render(){const t=It.unix(new Date(this.date).getTime()/1e3);return It(t).format(this.format)}},rt([yt()],P.DateTimePrimitive.prototype,"date",2),rt([yt()],P.DateTimePrimitive.prototype,"format",2),rt([yt()],P.DateTimePrimitive.prototype,"shadow",2),P.DateTimePrimitive=rt([se("date-time-primitive")],P.DateTimePrimitive),Object.defineProperty(P,Symbol.toStringTag,{value:"Module"})});
