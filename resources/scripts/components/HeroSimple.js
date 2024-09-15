import Component from "@/abstracts/Component"

export const HeroSimple = class HeroSimple extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_hero-simple.scss') ])
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