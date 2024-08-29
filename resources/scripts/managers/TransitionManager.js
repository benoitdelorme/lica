import Swup from 'swup';
import gsap from 'gsap';
import { $html } from '@/utils/dom'
import EventBus from '@/abstracts/EventBus'
import ComponentsManager from '@/managers/ComponentsManager'
import ScrollManager from '@/managers/ScrollManager'
import TrackerManager from '@/managers/TrackerManager'

export default class TransitionManager {
  static instance

  constructor() {
    if(TransitionManager.instance)
      return TransitionManager.instance

    TransitionManager.instance = this
    
    this.DOM = {}

    this.init()
    this.initEvents()

    this.openOnce()
  }

  init() {
    this.componentsManager = new ComponentsManager()
    this.scrollManager = new ScrollManager()
    this.trackerManager = new TrackerManager()

    this.DOM.root = document.querySelector('.c-transition')
    this.DOM.columns = [...this.DOM.root.querySelectorAll('.c-transition_column')]

    this.eventBus = new EventBus()
    this.swup = new Swup(
      {
        cache: true,
        containers: ['[data-load]'],
      }
    )
  }

  initEvents() {
    this.swup.hooks.replace('animation:out:await', this.onOut.bind(this))
    this.swup.hooks.replace('animation:in:await', this.onIn.bind(this))

    this.swup.hooks.on('history:popstate', (visit) => {
      //need something mooore
      location.reload()
    })

  }

  openOnce() {
    gsap.delayedCall(1, () => {
      this.eventBus.emit("page-open")
    })
  }

  onOut(visit) {
    $html.classList.add("is-loading")

    return new Promise((resolve) => {
      gsap.set(this.DOM.root, { display: "flex" })
      gsap.fromTo(this.DOM.columns, { yPercent: 100 }, { yPercent: 0, duration: 0.7, stagger: { amount: 0.3, from: "end" }, ease: "power2.out", onComplete: () => {
        this.eventBus.emit("page-view")
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

    return new Promise((resolve) => {
      gsap.to(this.DOM.columns, { yPercent: -100, duration: 0.9, stagger: { amount: 0.3, from: "end" }, ease: "power2.out", onComplete: () => {
        this.eventBus.emit("page-view")
        $html.classList.remove("is-loading")
        gsap.set(this.DOM.root, { display: "none" })
        this.scrollManager.resume()
        this.eventBus.emit("page-open")

        resolve()
      }})

    })
  }
}