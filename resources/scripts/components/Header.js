import Component from "@/abstracts/Component"

export const Header = class Header extends Component {
	constructor(config) {
		super(config, [ () => import('@!c/_header.scss') ])
		this.isStatic = true
	}

	mount() {
		this.state.isOpen = false
    this.events()
	}

	events() {
		this.DOM.action.addEventListener("click", this.onToggleMenu.bind(this))
		this.eventBus.on("menu-is-open", this.toggle.bind(this))
	}
	
	toggle(isOpen) {
		isOpen ? this.open() : this.close()
	}

	open() {
		this.DOM.root.classList.add("-is-open")
		this.state.isOpen = true
	}

	close() {
		this.DOM.root.classList.remove("-is-open")
		this.state.isOpen = false
	}

	onToggleMenu() {
		this.eventBus.emit("menu-toggle")
	}

	resize() {
		
	}
}