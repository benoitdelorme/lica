import Component from "@/abstracts/Component"

export const Header = class Header extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_header.scss') ])
	}

	mount() {
    
	}

	resize() {
		
	}
}