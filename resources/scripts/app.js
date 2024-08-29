import '@!/style.scss';

import { IS_DEBUG } from "@/settings/config"

import ComponentsManager from "@/managers/ComponentsManager"
import ScrollManager from "@/managers/ScrollManager"
import TransitionManager from "@/managers/TransitionManager"
import TrackerManager from "@/managers/TrackerManager"

import EventBus from "@/abstracts/EventBus"

import { gridHelper } from "@/utils/grid-helper"
import { statsMeter } from "@/utils/stats-meter"

export default class App {
	static instance

	static getInstance() {
		return App.instance
	}

	constructor() {
		if (App.instance) return App.instance

		App.instance = this

		this.preInit()
		this.init()
		this.start()
	}

	preInit() {
		if(IS_DEBUG) {
			gridHelper()
			statsMeter()
		}
	}

	init() {
		this.eventBus = new EventBus()
		this.scrollManager = new ScrollManager()
		this.transitionManager = new TransitionManager()
		this.componentsManager = new ComponentsManager()
		this.trackerManager = new TrackerManager()
	}

	start() {
		this.componentsManager.mount()
		this.scrollManager.start()
	}
}

window.addEventListener("load", () => new App())
