import Component from "@/abstracts/Component"

export const Menu = class Menu extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_menu.scss') ])
	}

	mount() {
    
	}

	resize() {
		
	}
}