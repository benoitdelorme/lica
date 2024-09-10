import Component from "@/abstracts/Component"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const ScrollIndicator = class ScrollIndicator extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_scroll-indicator.scss') ])
    this.isStatic = true
	}
	
	mount() {
    this.events()
	}

  events() {
    this.scrollManager.lenis.on("scroll", this.update.bind(this))
  }

  update() {
    this.clear()
    this.start()
  }

  clear() {
    gsap.killTweensOf(this.DOM.root)
    this.hide()
    clearTimeout(this.timer)
  }

  start() {
    this.timer = setTimeout(() => {
      this.show()
    }, 4000)
  }

  show() {
    gsap.to(this.DOM.root, { opacity: 1, duration: 0.6, ease: "linear" })
  }

  hide() {
    gsap.to(this.DOM.root, { opacity: 0, duration: 0.3, ease: "linear" })
  }

	resize() {
		
	}
}