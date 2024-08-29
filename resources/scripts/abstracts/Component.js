import ScrollManager from "@/managers/ScrollManager"
import EventBus from '@/abstracts/EventBus'
import { splitText } from '@/utils/dom'

export default class Component {

  #splittedRefs = []
  #registeredAnimations = []

  constructor({target, uID}, stylesheets = []) {
    this.DOM = {}
    this.state = {}
    this.uID = uID
    this.stylesheets = stylesheets
    this.DOM.root = target
    
    this.scrollManager = new ScrollManager()
    this.scrollTrigger = this.scrollManager.scrollTrigger
    this.eventBus = new EventBus()
    
    this.#loadStyles().then(() => {
      this.#parseRootOptions()
      this.#parseRefs()
      this.mount()
    })
  }

  mount() {}

  async #loadStyles() {
    for (let i = 0; i < this.stylesheets.length; i++) {
      await this.stylesheets[i]();
    }
	}
  
  #parseRefs() {
    const refs = [...this.DOM.root.querySelectorAll('[data-ref]')]

    refs.forEach(refDom => {
      /* identify text to split */
      if(refDom.getAttribute('data-split') && !refDom.dataset.anim)
        this.#splitRef(refDom)
      
      /* identify animation */
      if(refDom.dataset.anim)
        this.#registerAnimation(refDom)

      // Save Ref
      this.#saveRef(refDom)
    })
  }

  #splitRef(refDom) {
    const splitName = refDom.dataset.split
    const splitType = refDom.dataset.splitType ?? "words,lines"

    let splittedRef

    if(splitName != "") {
      splittedRef = this.DOM[splitName] = splitText( refDom, splitType )
    }
    else {
      splittedRef = splitText( refDom, splitType )
    }

    this.#splittedRefs.push(splittedRef)
  }

  #registerAnimation(ref) {
    this.#registeredAnimations.push({
      'ref': ref,
      'anim': ref.dataset.anim,
      'scrollTrigger': this.scrollTrigger.add(ref, ref.dataset.anim)
    })
  }

  #saveRef(refDom) {
    const name = refDom.dataset.ref

    if(!this.DOM[name]) {
      this.DOM[name] = refDom
    } 
    else if(Array.isArray(this.DOM[name])) {
      this.DOM[name].push(refDom)
    } 
    else {
      this.DOM[name] = [this.DOM[name], refDom]
    }
  }

  #parseRootOptions() {
    let options = {};
    let optionsFromAttribute = this.DOM.root.getAttribute('data-options')

    if(optionsFromAttribute) {
      options = JSON.parse(optionsFromAttribute)
    }
    
    this.options = {
      ...options
    }
  }
  
  unmount() {
    for(let i = 0; i < this.#registeredAnimations.length; i++) {
      this.#registeredAnimations[i].scrollTrigger?.kill()
    }
  }

  resize() {
    for(let i = 0; i < this.#registeredAnimations.length; i++) {
      if(this.#registeredAnimations[i].scrollTrigger?.progress != 1) {
        this.#registeredAnimations[i].scrollTrigger?.kill()
        this.#registeredAnimations[i].scrollTrigger = 
          this.scrollTrigger.add(
            this.#registeredAnimations[i].ref, 
            this.#registeredAnimations[i].anim
          )
      }
    }

    for(let i = 0; i < this.#splittedRefs.length; i++) {
      this.#splittedRefs[i].splitText()
    }
  }
}