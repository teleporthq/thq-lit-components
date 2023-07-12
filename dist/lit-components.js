import { LitElement as c } from "lit";
import { customElement as f } from "lit/decorators/custom-element.js";
import { property as i } from "lit/decorators/property.js";
import l from "dayjs";
var u = Object.defineProperty, v = Object.getOwnPropertyDescriptor, h = (t, r, s, o) => {
  for (var e = o > 1 ? void 0 : o ? v(r, s) : r, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (e = (o ? n(r, s, e) : n(e)) || e);
  return o && e && u(r, s, e), e;
};
let p = class extends c {
  createRenderRoot() {
    return this.shadow ? this.attachShadow({ mode: "open" }) : this;
  }
  render() {
    const t = l.unix(new Date(this.date).getTime() / 1e3);
    return l(t).format(this.format);
  }
};
h([
  i()
], p.prototype, "date", 2);
h([
  i()
], p.prototype, "format", 2);
h([
  i()
], p.prototype, "shadow", 2);
p = h([
  f("date-time-primitive")
], p);
var w = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, d = (t, r, s, o) => {
  for (var e = o > 1 ? void 0 : o ? _(r, s) : r, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (e = (o ? n(r, s, e) : n(e)) || e);
  return o && e && w(r, s, e), e;
};
let m = class extends c {
  createRenderRoot() {
    return this.shadow ? this.attachShadow({ mode: "open" }) : this;
  }
  connectedCallback() {
    super.connectedCallback();
    const t = document.createRange().createContextualFragment(this.html);
    window.addEventListener("load", () => {
      if (this.shadow) {
        this.shadowRoot.append(t);
        return;
      }
      this.style.display = "contents", this.append(t);
    });
  }
};
d([
  i()
], m.prototype, "html", 2);
d([
  i()
], m.prototype, "shadow", 2);
m = d([
  f("dangerous-html")
], m);
export {
  m as DangerousHTML,
  p as DateTimePrimitive
};
