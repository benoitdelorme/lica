import Component from "@/abstracts/Component"

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const Logo = class Logo extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_blocks-images-sticky.scss') ])
	}

	mount() {
		this.initScrollAnimation()
	}

	initScrollAnimation() {

		const widthPlan = this.DOM.planification.clientWidth
		const widthLica = this.DOM.lica.clientWidth

		console.log(widthPlan)
		
		gsap.fromTo(this.DOM.planification, {
			width: widthPlan,
			transform: "translateY(0)",
		}, { 
			width: "65.86px",
			transformOrigin: 
			"top left", 
			transform: "translateY(3px)",
			scrollTrigger: {
				id: "planificationLogo",
				trigger: document.querySelector('[data-component="BlocksImagesSticky"]'),
				start: "top top-=40",
				end: `top top-=${window.innerHeight}`,
				scrub: true,
			}
		})

		gsap.fromTo(this.DOM.lica, {
			width: widthLica,
			yPercent: -100,
			top: `${window.innerHeight - 40}`,
		}, { 
			width: "65.88px",
			top: "calc(4.05273438vh + 13.5px)",
			yPercent: 0,
			transformOrigin: 
			"top left", 
			scrollTrigger: {
				id: "licaLogo",
				trigger: document.querySelector('[data-component="BlocksImagesSticky"]'),
				start: "top top-=40",
				end: `top top-=${window.innerHeight}`,
				scrub: true,
			}
		})

		gsap.fromTo([this.DOM.line, this.DOM.misc], {
			opacity: 0
		}, {
			opacity: 1,
			scrollTrigger: {
				id: "miscLogo",
				trigger: document.querySelector('[data-component="BlocksImagesSticky"]'),
				start: `top top-=${window.innerHeight}`,
				end: `+=140`,
				scrub: true,
			}
		})

		ScrollTrigger.refresh()
		ScrollTrigger.update()
	}

	resetAnimation() {
		if(ScrollTrigger.getById("planificationLogo"))
			ScrollTrigger.getById("planificationLogo").kill()

		if(ScrollTrigger.getById("licaLogo"))
			ScrollTrigger.getById("licaLogo").kill()
		

		if(ScrollTrigger.getById("miscLogo"))
			ScrollTrigger.getById("miscLogo").kill()
		

		gsap.killTweensOf(this.DOM.line)
		gsap.killTweensOf(this.DOM.misc)
		gsap.killTweensOf(this.DOM.lica)
		gsap.killTweensOf(this.DOM.planification)

		gsap.set(this.DOM.line, {clearProps: true})
    gsap.set(this.DOM.misc, {clearProps: true})
    gsap.set(this.DOM.lica, {clearProps: true})
    gsap.set(this.DOM.planification, {clearProps: true})
	}

	unmount() {
		//called before component destroyed
	}

	resize() {
		super.resize()
		
		this.resetAnimation()
		this.initScrollAnimation()
	}
}