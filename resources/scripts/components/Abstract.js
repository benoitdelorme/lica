import Component from "@/abstracts/Component"

export const Abstract = class Abstract extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_abstract.scss') ])
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