import Component from "@/abstracts/Component"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const HorizontalSection = class HorizontalSection extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_horizontal-section.scss') ])
	}

	mount() {
		this.blockCount = 0
		this.blockLoaded = 0

		this.initEvents()

		if(!Array.isArray(this.DOM.blocks)) {
			this.DOM.blocks = [this.DOM.blocks]
		}

		this.blockCount = this.DOM.blocks.length
	}

	tryToInitScroll() {
		this.blockLoaded++

		if(this.blockCount == this.blockLoaded) {
			this.initHorizontalScroll()
		}
	}

	initHorizontalScroll() {
		let totalWidth = 0

		this.DOM.blocks.forEach(block => {
				totalWidth += block.offsetWidth
		})

		gsap.to(this.DOM.wrapper, {
				x: () => `-${totalWidth - window.innerWidth}px`, // Scroll à gauche jusqu'à la fin des panels
				ease: 'linear',
				scrollTrigger: {
					trigger: this.DOM.root,
					id: "horizontalSection",
					start: 'top top',
					end: () => `+=${totalWidth}`,
					scrub: true,
					pin: true,
					invalidateOnRefresh: true,
				}
		})
	}

	initEvents() {
		this.eventBus.on("block-loaded", () => {
			this.tryToInitScroll()
		})
	}

	unmount() {
		//called before component destroyed
	}

	resize() {
		super.resize()
		
		if(ScrollTrigger.getById("horizontalSection")) 
			ScrollTrigger.getById("horizontalSection").kill()

		gsap.killTweensOf(this.DOM.wrapper)

		this.initHorizontalScroll()

	}
}