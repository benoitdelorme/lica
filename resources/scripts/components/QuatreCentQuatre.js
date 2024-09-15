import Component from "@/abstracts/Component"

export const QuatreCentQuatre = class QuatreCentQuatre extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_quatre-cent-quatre.scss') ])
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