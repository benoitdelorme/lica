import Component from "@/abstracts/Component"

export const Footer = class Footer extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_footer.scss') ])
		this.isStatic = true
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