import Component from "@/abstracts/Component"

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const BlocksImagesSticky = class BlocksImagesSticky extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_blocks-images-sticky.scss') ])
	}

	mount() {
		this.initScroll()
	}

	unmount() {}

	initScroll() {
		if(Array.isArray(this.DOM.imagesWrappers)) {
			const rootHeight = this.DOM.root.offsetHeight
			const triggerDistance = rootHeight / this.DOM.imagesWrappers.length

			this.DOM.imagesWrappers.forEach((item, index) => {

				const start = triggerDistance * index
				const end = triggerDistance * (index + 1) - 200

				ScrollTrigger.create({
					trigger: this.DOM.root,
					start: `top top-=${start}`,
					end: `top top-=${end}`,
					onEnter: () => {
						this.hideAllImages()
						this.showImage(index)
					},
					onEnterBack: () => {
						this.hideAllImages()
						this.showImage(index)
					}
				})

				gsap.timeline(
					{
						scrollTrigger:{
							start: `top top-=${start}`,
							end: `top top-=${end}`,
							ease: "linear",
							scrub: 1
						}
					})
				.fromTo(this.DOM.imagesSources[index], { y: 50 }, { y: 0 })
			})
		}
	}

	hideAllImages() {
		gsap.set(this.DOM.imagesWrappers, { zIndex: 2 })
		gsap.set(this.DOM.imagesWrappers, { opacity: 0, duration: 0.35, ease: "linear" })
	}

	showImage(index) {
		gsap.killTweensOf(this.DOM.imagesWrappers[index])
		gsap.set(this.DOM.imagesWrappers[index], { zIndex: 3 })
		gsap.set(this.DOM.imagesWrappers[index], { opacity: 1, duration: 0.65, ease: "linear" })
	}

	resize() {
		super.resize()
	}

}