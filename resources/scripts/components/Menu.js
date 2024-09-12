import Component from "@/abstracts/Component"
import gsap from 'gsap'
import TransitionManager from '@/managers/TransitionManager'

export const Menu = class Menu extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_menu.scss') ])
	}

	mount() {
		this.state.isOpen = false
		this.transitionManager = new TransitionManager()
		/* this.openAnimation = gsap.timeline( { onStart: () => { this.DOM.root.classList.remove("is-hidden") } })
    this.closeAnimation = gsap.timeline({ onComplete: () => { this.DOM.root.classList.add("is-hidden") } }) */

    this.eventBus.on("menu-toggle", this.toggle.bind(this))
    this.eventBus.on("menu-close", this.close.bind(this))
		this.events()
	}

	events() {
		this.DOM.root.addEventListener("click", this.close.bind(this))
		this.DOM.menu.addEventListener("click", this.onClickMenu.bind(this))
		
		this.DOM.items.forEach((item) => {
			item.addEventListener("click", this.navigate.bind(this, item))
		})
	}

	onClickMenu(e) {
		e.preventDefault()
		e.stopImmediatePropagation()
		e.stopPropagation()
	}

	navigate(item) {
		this.transitionManager.swup.navigate(item.querySelector("a").href)
	}

	toggle() {
    !this.state.isOpen ? this.open() : this.close()
  }

	open() {
		this.state.isOpen = true
		this.scrollManager.stop()

		this.eventBus.emit("menu-is-open", this.state.isOpen)
		this.DOM.root.classList.remove("is-hidden")
		gsap.killTweensOf(this.DOM.background)
		gsap.killTweensOf(this.DOM.menu)
		gsap.killTweensOf(this.DOM.items)

		gsap.fromTo(this.DOM.background, { opacity: 0 }, { opacity: 1, ease: "linear" })
		gsap.fromTo(this.DOM.menu, { xPercent: 100 }, { xPercent: 0, duration: 1.1, ease: "expo.out", delay: 0.2 })
		gsap.fromTo(this.DOM.items, { opacity: 0 }, { opacity: 1, duration: 0.7, stagger: 0.065, ease: "linear", delay: 0.2 })
	}

	close(immediate = 0) {
		this.state.isOpen = false
		this.scrollManager.resume()
		this.eventBus.emit("menu-is-open", this.state.isOpen)

		gsap.killTweensOf(this.DOM.background)
		gsap.killTweensOf(this.DOM.menu)
		gsap.killTweensOf(this.DOM.items)

		if(immediate != 1) {
			gsap.to(this.DOM.menu, { xPercent: 100, duration: 0.6, ease: "power3.in" })
			gsap.to(this.DOM.background, { opacity: 0, ease: "linear", delay: 0.4, onComplete: () => {
				this.DOM.root.classList.add("is-hidden")
			}})
		}
		else {
			this.DOM.root.classList.add("is-hidden")
			gsap.set(this.DOM.menu, { xPercent: 100, ease: "power3.in" })
			gsap.set(this.DOM.background, { opacity: 0, ease: "linear"})
		}
	}

	resize() {
		
	}
}