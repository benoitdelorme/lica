import Component from "@/abstracts/Component"
import { preloadImages } from "@/utils/images"

export const ContentColumns = class ContentColumns extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_content-columns.scss') ])
	}

	mount() {
		preloadImages(this.DOM.root).then(() => {
			this.eventBus.emit("block-loaded")
		})
	}

	resize() {
		
	}
}