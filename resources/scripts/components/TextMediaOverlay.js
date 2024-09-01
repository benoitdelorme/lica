import Component from "@/abstracts/Component"

export const TextMediaOverlay = class TextMediaOverlay extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_text-media-overlay.scss') ])
	}

	mount() {
    //called after component fully loaded
	}

	unmount() {
		//called before component destroyed
	}

	resize() {
		super.resize()
		//called by the component manager when page is resized
	}
}