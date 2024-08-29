import Lenis from 'lenis'
import Tempus from '@darkroom.engineering/tempus'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import * as animationPresets from "@/animations/presets"
import { DEBUG } from '@/settings/config.js'

export default class ScrollManager {

  static instance
  
  constructor() {
    if(ScrollManager.instance)
        return ScrollManager.instance

    ScrollManager.instance = this

    this.queue = []
    
    this.init()
    this.setScrollTrigger()
    this.setLenis()
  }

  init() {
    if (history.scrollRestoration) {
			history.scrollRestoration = "manual"
		}

		gsap.ticker.lagSmoothing(0)
		gsap.ticker.remove(gsap.updateRoot)

		Tempus.add((time) => {
			gsap.updateRoot(time / 1000)
		}, 0)
  }
  
  start() {
    this.updater = Tempus.add((time) => {
        this.lenis.raf(time)
    }, 0)
  }

  resume() {
    this.scrollTrigger.refresh()
    this.lenis.start()
  }

  stop() {
    this.lenis.stop()
  }

  removeScrollTriggerEvents() {
    let triggers = this.scrollTrigger.getAll()
    let triggersCount = triggers.length
    
    for (let i = 0; i < triggersCount; i++) {
      triggers[i].kill(true)
    }
  }
  
  destroy() {
    this.lenis.destroy()
    this.removeScrollTriggerEvents()
    this.updater()
  }

  setScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger)

    /* Proxy ScrollTrigger */
    this.scrollTrigger = ScrollTrigger
    
    // Custom Add Function With Preset
    this.scrollTrigger.add = this.addTrigger.bind(this)

    // Debug
    this.scrollTrigger.defaults({ markers: DEBUG.scrollTrigger })
  }

  setLenis() {
    this.lenis = new Lenis({ 
			duration: 1.6,
			touchMultiplier: 0,
    })

    this.lenis.on('scroll', this.onScroll.bind(this))
  }

  addTrigger(el, presetName) {
    return ScrollTrigger.create(animationPresets[presetName](el))
  }
  
  addToQueue(uID, callback) {
    this.queue.push({ id: uID, callback: callback })
  }

  onScroll(e) {
    this.scrollTrigger.update()
    this.queue.forEach((el) => {el.callback(e)})
  }
  
  removeFromQueue(uID) {
    const index = this.queue.findIndex((item) => item.id === uID)

    if (index > -1)
      this.queue.splice(index, 1)
  }

  resize() {
    this.scrollTrigger.update()
  }
}