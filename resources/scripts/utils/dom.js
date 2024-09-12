import SplitType from 'split-type'

/* 
  Add Wrapper on Nodes
  @elems - Nodes to wrap
  @wrapType - Node wrap type (span, div...)
  @wrapClass - Class to add on wrapper
*/
export const wrapElements = (elems, wrapType, wrapClass) => {
  elems.forEach(char => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.classList = wrapClass;
    char.parentNode.appendChild(wrapEl);
    wrapEl.appendChild(char);
  })
}

export function offset(el) {
  const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

export function parallaxIt(e, parent, movement) {
  let relX = e.pageX - offset(parent).left
  let relY = e.pageY - offset(parent).top
  const x = (relX - parent.offsetWidth / 2) / parent.offsetWidth * movement
  const y = (relY - parent.offsetHeight / 2) / parent.offsetHeight * movement
  
  return {x: x, y: y}
}

export function splitText(el, type, kerning = true) {
  // Could Be replace by gsap splitText
  const splitType = type ?? "words,lines"

  if(kerning) 
    el.style.fontKerning = "none"

  return new SplitType(el, { type: splitType })
}

const $html = document.documentElement
const $body = document.body
const $rootContent = $body.querySelector(".root-content")

export {
  $html,
  $body,
  $rootContent,
}