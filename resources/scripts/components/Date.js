import Component from "@/abstracts/Component"
import { preloadImages } from "@/utils/images"

export const Date = class Date extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_date.scss') ])
	}
	
	mount() {
    preloadImages(this.DOM.root).then(() => {
			this.eventBus.emit("block-loaded")
		})
	}

	resize() {
		
	}
}