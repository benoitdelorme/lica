import Component from "@/abstracts/Component"
import { preloadImages } from "@/utils/images"

export const Media = class Media extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_media.scss') ])
	}

	mount() {
    //called after component fully loaded

		if(this.options.preload) {
			preloadImages(this.DOM.root).then(() => {
				this.eventBus.emit("block-loaded")
			})
		}
	}

	unmount() {
		//called before component destroyed
	}

	resize() {
		super.resize()
		//called by the component manager when page is resized
	}
}