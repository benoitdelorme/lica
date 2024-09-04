import Component from "@/abstracts/Component"
import { preloadImages } from "@/utils/images"

export const Magazine = class Magazine extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_magazine.scss') ])
	}

	mount() {
		preloadImages(this.DOM.root).then(() => {
			this.eventBus.emit("block-loaded")
		})
    
	}

	resize() {
		
	}
}