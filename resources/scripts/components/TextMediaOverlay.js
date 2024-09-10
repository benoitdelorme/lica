import Component from "@/abstracts/Component"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const TextMediaOverlay = class TextMediaOverlay extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_text-media-overlay.scss') ])
	}

	mount() {	
		setTimeout(() => {
			this.tl = gsap.timeline({
				scrollTrigger: {
					trigger: this.DOM.root,
					start: 'top top',
					end: () => `+=${2 * window.innerHeight}`,
					scrub: true,
					pin: this.DOM.root,
				}
			})
			
			this.tl.from(this.DOM.mediaContainer, {
				yPercent: 100,
				ease: "power1.out",
				force3D: true,
			}, 0)
			
			this.tl.from(this.DOM.mediaContainer, {
				ease: "power2.out",
				clipPath: () => `inset(calc(50% - 240px) calc(50% - 160px) calc(50% - 240px) calc(50% - 160px))`,
				ease: 'linear',
			}, 0.6)
	
			this.tl.from(this.DOM.media, {
				ease: "power3.out",
				scale: 0.5,
				ease: 'linear',
			}, 0.5)
			
			ScrollTrigger.refresh()
		}, 500)
		
	}

	unmount() {
		
	}

	resize() {
		super.resize()
	}
}