import Component from "@/abstracts/Component"

export const Hero = class Hero extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_hero.scss') ])
	}

	mount() {
    
	}

	resize() {
		
	}
}