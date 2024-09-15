import Tempus from '@darkroom.engineering/tempus'

import Component from "@/abstracts/Component"
import ScrollManager from '@/managers/ScrollManager'

import { lerp } from '@/utils/maths'

export const Marquee = class Marquee extends Component {

	constructor(config) {
		super(config, [ () => import('@!c/_marquee.scss') ])
	}

	mount() {
		this.lerp = {current: 0, target: 0};
		this.interpolationFactor = 0.8;
		this.speed = 0.03;
		this.directionScroll = 1;
		this.lastScrollTop = 0
		this.multiplier = 1
		this.prevDirectionScroll = 1

		this.scrollManager = new ScrollManager()
		this.scrollManager.addToQueue(this.uID, this.onScroll.bind(this))
		
		this.init()

		this.render()
	}

	init() {
		this.DOM.inner.style.cssText = `position: relative; display: inline-flex; white-space: nowrap; will-change: transform; backface-visibility: hidden;`
		this.DOM.inner.children[1].style.cssText = `position: absolute; left: -100%;`
		this.DOM.inner.children[2].style.cssText = `position: absolute; left: 100%;`
	}

	render() {
		this.updater = Tempus.add((time) => {
			this.update()
		})
	}

	onScroll({direction, velocity}) {
		this.directionScroll = (direction) ? -direction : this.prevDirectionScroll
		this.multiplier = 2 + Math.abs(velocity)

		this.prevDirectionScroll = this.directionScroll
	}

	update() {
		this.lerp.target += this.speed * this.directionScroll * this.multiplier
		this.lerp.current = lerp(this.lerp.current, this.lerp.target, this.interpolationFactor)
		
		if (this.lerp.target > 100 || this.lerp.target < -100) {
				this.lerp.current -= this.lerp.target
				this.lerp.target = 0
		}

		this.DOM.inner.style.transform = `translate3d(${this.lerp.current}%, 0, 0)`

		this.multiplier = 1
	}

	unmount() {
		this.updater()
		this.scrollManager.removeFromQueue(this.uID)
	}

	resize() {
		super.resize()
	}
}