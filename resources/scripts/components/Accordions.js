import Component from "@/abstracts/Component"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { preloadImages } from "@/utils/images"

export const Accordions = class Accordions extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_accordions.scss') ])
	}
	
	mount() {
    preloadImages(this.DOM.root).then(() => {
      this.events()
			this.eventBus.emit("block-loaded")
		})
	}

  events() {
    this.eventBus.on("horizontal-section-created", (scrollTween) => {
      this.resetAnimations()
      this.initAccordions(scrollTween)
    })
  }

  resetAnimations() {
    if(ScrollTrigger.getById("scrollFirst")) 
			ScrollTrigger.getById("scrollFirst").kill()

    if(ScrollTrigger.getById("scrollSecond")) 
			ScrollTrigger.getById("scrollSecond").kill()

    gsap.killTweensOf(this.DOM.root)
    gsap.killTweensOf(this.DOM.items[1])
    gsap.killTweensOf(this.DOM.items[2])

    this.tl1?.kill()
    this.tl2?.kill()
    
    gsap.set(this.DOM.root, {clearProps: true})
    gsap.set(this.DOM.items[1], {clearProps: true})
    gsap.set(this.DOM.items[2], {clearProps: true})

    this.hideTexts()
  }

  initAccordions(scrollTween) {
		const baseValue = 200 * window.innerWidth / 1440; // 200pixels in mockup
		const totalWidth = window.innerWidth - 2 * baseValue;

		this.tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: this.DOM.root,
				start: "top top",
				scrub: true,
        id: "scrollFirst",
				ease: "linear",
				end: `+=${3 * totalWidth}`,
				containerAnimation: scrollTween,
			}
		})
    
		this.tl1.to(this.DOM.root, {
			x: 3 * totalWidth,
			ease: "linear",
			force3D: true,
		})
		
		this.tl2 = gsap.timeline({
			scrollTrigger: {
				trigger: this.DOM.root,
				start: "top top",
				scrub: true,
        id: "scrollSecond",
				ease: "linear",
				end: `+=${2 * totalWidth}`,
				containerAnimation: scrollTween,
			},
      onUpdate: () => {
        this.showTexts(this.tl2.progress())
      }
		})

		const accordionItems = [this.DOM.items[1], this.DOM.items[2]]

		accordionItems.forEach((item) => {
			this.tl2.from(item, {
				x: window.innerWidth - 3 * baseValue,
				ease: "linear",
				force3D: true,
        onComplete: () => {
          console.log("complete")
        },
        onStart: () => {
          console.log("start")
        },
			})
		})
  }

  hideTexts() {
    gsap.to([this.DOM.texts[1], this.DOM.texts[2]], { duration: 0.3, opacity: 0 })
  }

  showTexts(progress) {
    if(progress < 0.25) {
      gsap.to(this.DOM.texts[0], { duration: 0.3, opacity: 1 })
      gsap.to(this.DOM.texts[1], { duration: 0.3, opacity: 0 })
      gsap.to(this.DOM.texts[2], { duration: 0.3, opacity: 0 })
    }
    else if(progress > 0.25 && progress < 0.5) {
      gsap.to(this.DOM.texts[0], { duration: 0.3, opacity: 0 })
      gsap.to(this.DOM.texts[1], { duration: 0.3, opacity: 1 })
      gsap.to(this.DOM.texts[2], { duration: 0.3, opacity: 0 })
    }
    else if(progress > 0.75) {
      gsap.to(this.DOM.texts[0], { duration: 0.3, opacity: 0 })
      gsap.to(this.DOM.texts[1], { duration: 0.3, opacity: 0 })
      gsap.to(this.DOM.texts[2], { duration: 0.3, opacity: 1 })
    }
  }

	resize() {
		
	}
}