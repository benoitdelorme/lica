import Component from "@/abstracts/Component"

export const Sections = class Sections extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_sections.scss') ])
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