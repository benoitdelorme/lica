import Component from "@/abstracts/Component"

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { $html } from '@/utils/dom'

export const Logo = class Logo extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_logo.scss') ])
		this.isStatic = true
	}

	mount() {
		this.events()
		this.initState()
	}

	events() {
		this.eventBus.on("page-open", this.initState.bind(this))
	}

	initState() {
		const blockLogo = $html.querySelector("[data-component='BlocksImagesStickyLogo']")

		if(blockLogo) {
			gsap.set(this.DOM.root, { opacity: 0 })
		}else {
			gsap.set(this.DOM.root, { opacity: 1 })
		}
	}

	showLogo() {
		console.log("ici")
		gsap.to(this.DOM.root, { opacity: 1, duration: 0.6, ease: "linear" })
	}

	hideLogo() {
		console.log("la")
		gsap.killTweensOf(this.DOM.root)
		gsap.set(this.DOM.root, { opacity: 0 })
	}

	unmount() {
		
	}

	resize() {
		super.resize()
	}
}