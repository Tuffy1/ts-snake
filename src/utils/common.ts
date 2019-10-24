export function setAttr(ele: Element, attrs) {
  for (let key in attrs) {
    ele.setAttribute(key, attrs[key]);
  }
}
