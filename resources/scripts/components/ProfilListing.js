import Component from "@/abstracts/Component"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const ProfilListing = class ProfilListing extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_profil-listing.scss') ])
	}

	mount() {
    //called after component fully loaded
		
		this.DOM.items.forEach(item => {
			item.addEventListener("click", this.openProfil.bind(this, item))
		});

		this.DOM.closes.forEach(close => {
			close.addEventListener("click", this.closeProfil.bind(this, close))
		});
	}

	openProfil(item) {
		this.state.currentIndex = this.DOM.items.indexOf(item)
		this.DOM.popup.classList.remove("is-hidden")
		this.DOM.panels[this.state.currentIndex].classList.remove("is-hidden")

		this.scrollManager.stop()

		gsap.fromTo(this.DOM.popup, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "linear" })
		gsap.fromTo(this.DOM.panels[this.state.currentIndex], { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% -100%)", duration: 1.9, ease: "power3.out"})
		gsap.fromTo(this.DOM.pictures[this.state.currentIndex], { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, delay: 0.4, ease: "power2.out"})
		gsap.fromTo(this.DOM.picturesSources[this.state.currentIndex], { scale: 1.1 }, { scale: 1, duration: 3, delay: 0.6, ease: "power2.out"})

	}

	closeProfil() {
		gsap.to(this.DOM.popup, { opacity: 0, duration: 0.6, ease: "linear", delay: 0.6 })
		
		this.scrollManager.resume()

		gsap.to(this.DOM.panels[this.state.currentIndex], { clipPath: "inset(0% 0% 0% 100%)", duration: 0.9, ease: "power3.in", onComplete: () => {
			this.DOM.popup.classList.add("is-hidden")
			this.DOM.panels[this.state.currentIndex].classList.add("is-hidden")
		}})

	}

	unmount() {
		//called before component destroyed
	}

	resize() {
		super.resize()
		//called by the component manager when page is resized
	}
}