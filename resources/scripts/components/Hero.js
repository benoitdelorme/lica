import Component from "@/abstracts/Component"
import { preloadImages } from "@/utils/images"

export const Hero = class Hero extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_hero.scss') ])
	}

	mount() {
    preloadImages(this.DOM.root).then(() => {
			this.eventBus.emit("block-loaded")
		})
	}

	resize() {
		
	}
}