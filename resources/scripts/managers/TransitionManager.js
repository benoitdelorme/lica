import Swup from 'swup';
import gsap from 'gsap';
import { $html, $body } from '@/utils/dom'
import EventBus from '@/abstracts/EventBus'
import ComponentsManager from '@/managers/ComponentsManager'
import ScrollManager from '@/managers/ScrollManager'
import TrackerManager from '@/managers/TrackerManager'
import { COLORS } from '@/settings/config.style'

export default class TransitionManager {
  static instance

  constructor() {
    if(TransitionManager.instance)
      return TransitionManager.instance

    TransitionManager.instance = this
    
    this.DOM = {}

    this.init()
    this.initEvents()
  }

  init() {
    this.COLORS = Object.keys(COLORS).map((key) => COLORS[key])
    this.componentsManager = new ComponentsManager()
    this.scrollManager = new ScrollManager()
    this.trackerManager = new TrackerManager()

    this.DOM.root = document.querySelector('.c-transition')
    this.DOM.columns = [...this.DOM.root.querySelectorAll('.c-transition_column_inner')]

    this.eventBus = new EventBus()
    this.swup = new Swup(
      {
        cache: true,
        containers: ['[data-load]'],
      }
    )
  }

  start() {
    this.openOnce()
  }

  initEvents() {
    this.swup.hooks.replace('animation:out:await', this.onOut.bind(this))
    this.swup.hooks.replace('animation:in:await', this.onIn.bind(this))

    this.swup.hooks.on('history:popstate', (visit) => {
      location.reload()
    })

  }

  openOnce() {
    gsap.delayedCall(1, () => {
      this.eventBus.emit("page-open")
    })
    gsap.fromTo($body, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.3, ease: "linear" })
    $body.classList.remove("is-invisible")
  }

  onOut(visit) {
    $html.classList.add("is-loading")

    return new Promise((resolve) => {
      gsap.set(this.DOM.root, { display: "flex" })
      gsap.set(this.DOM.root, { "--color-random": this.COLORS[Math.floor(Math.random() * this.COLORS.length)] })
      
      gsap.fromTo(this.DOM.columns, { yPercent: 100 }, { yPercent: 0, duration: 0.7, stagger: { amount: 0.3,from: "end" }, ease: "power2.out", onComplete: () => {
        this.eventBus.emit("menu-close", 1) 
        window.scrollTo(0, 0)
        this.componentsManager.unmount()
        this.scrollManager.stop()
        this.scrollManager.removeScrollTriggerEvents()

        resolve()
      }}) 
    })
  }
  

  onIn(visit) {
    this.componentsManager.mount($html.querySelector(visit.containers[0]))
    
    this.eventBus.emit("is-loading")

    return new Promise((resolve) => {
      gsap.fromTo(visit.containers[0], { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.3, ease: "linear" })
      gsap.to(this.DOM.columns, { yPercent: -101, duration: 0.9, stagger: { amount: 0.3, from: "end" }, ease: "power2.out", onComplete: () => {
        this.eventBus.emit("page-view")
        $html.classList.remove("is-loading")
        this.eventBus.emit("show-logo")

        gsap.set(this.DOM.root, { display: "none" })
        this.scrollManager.resume()
        this.eventBus.emit("page-open")

        resolve()
      }})

    })
  }
}