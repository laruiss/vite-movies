
const domProto = {
  addEvent(eventType, callback) {
    this.els.forEach((el) => el.addEventListener(eventType, callback));
  },
  append(...nodes) {
    console.log(this.els)
    this.els.forEach((el) => el.append(...nodes));
    console.log(this.els);
    return $(this.els);
  },
  appendTo(targetEl) {
    this.els.forEach((el) => targetEl.append(el));
    console.log(this.els);
    return $(this.els);
  },
  val() {
    if (this.els.length === 0) {
      return null;
    }
    return this.els[0].value;
  }
};

const $ = (selector) => {
  const els =
    typeof selector === "object"
      ? selector
      : selector.startsWith("<")
      ? [createElFromHtml(selector)]
      : [...document.querySelectorAll(selector)];

  const wrapper = Object.create(domProto)
  wrapper.els = els
  return wrapper
};
