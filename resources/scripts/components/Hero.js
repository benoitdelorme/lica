import Component from "@/abstracts/Component"
import { preloadImages } from "@/utils/images"
import gsap from 'gsap'
import { COLORS } from '@/settings/config.style'

export const Hero = class Hero extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_hero.scss') ])
	}

	mount() {
    preloadImages(this.DOM.root).then(() => {
			this.init()
			this.events()	
			this.eventBus.emit("block-loaded")
		})
	}

	init() {
		this.clipPathValueStart 		= this.DOM.imageContainer.getAttribute("data-clip-path")
		this.transformValueStart 		= this.DOM.imageContainer.getAttribute("data-transform")
		this.version 								= this.DOM.title.getAttribute("data-version")
	}

	events() {
    this.eventBus.on("horizontal-section-created", (scrollTween) => {
      this.initScroll(scrollTween)
    })
  }

	initScroll(scrollTween) {
		const width = window.innerWidth

		this.tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: this.DOM.root,
				start: "top top",
				scrub: true,
				ease: "linear",
				end: `+=${width}`,
				containerAnimation: scrollTween,
			}
		})

		this.tl1.to(this.DOM.root, {
			x: width,
			ease: "linear",
			force3D: true,
		})

		this.tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: this.DOM.root,
				start: "top top",
				scrub: true,
				ease: "linear",
				end: `+=${width}`,
				containerAnimation: scrollTween,
			}
		})
		
		this.tl2.from(this.DOM.imageContainer, {
			ease: "power2.out",
			clipPath: this.clipPathValueStart
		}, 0.01)
		
		this.tl2.from(this.DOM.image, {
			ease: "power2.out",
			transform: this.transformValueStart
		}, 0)

		if(this.version == "version_1") {
			this.tl2.to(this.DOM.lines[0], {
				ease: "power3.out",
				yPercent: 100,
				color: COLORS.pearl
			}, 0)

			this.tl2.to(this.DOM.lines[2], {
				ease: "power3.out",
				yPercent: -100,
				color: COLORS.pearl
			}, 0)
		}
		else {
			this.tl2.to(this.DOM.lines, {
				ease: "power3.out",
				color: COLORS.pearl
			}, 0)

			this.tl2.from(this.DOM.lines[2], {
				ease: "power3.out",
				transform: "translate3d(-17.5vh,0,0)"
			}, 0)
		}

	}

	resize() {
		
	}
}