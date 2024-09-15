import Component from "@/abstracts/Component"

import gsap from 'gsap'

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
		this.eventBus.on("is-loading", this.initState.bind(this))
	}

	initState() {
		/* Check if there a logo in BlocksImagesSticky */
		const blockLogo = $html.querySelector("[data-component='BlocksImagesStickyLogo']")
		
		if(blockLogo) {
			this.hideLogo()
		} 
		else {
			this.showLogo()
		}
	}

	showLogo() {
		gsap.set(this.DOM.root, { opacity: 1 })
	}

	hideLogo() {
		gsap.set(this.DOM.root, { opacity: 0 })
	}

	unmount() {
		
	}

	resize() {
		super.resize()
	}
}