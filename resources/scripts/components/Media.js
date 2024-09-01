import Component from "@/abstracts/Component"

export const Media = class Media extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_media.scss') ])
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