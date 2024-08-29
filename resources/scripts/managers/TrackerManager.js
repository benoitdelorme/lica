import { Cookie } from "@/components/Cookie"
import EventBus from '@/abstracts/EventBus'

export default class TrackerManager {
  static instance
  
  constructor() {
    if(TrackerManager.instance)
        return TrackerManager.instance
  
    TrackerManager.instance = this

    this.eventBus = new EventBus()

    this.init()
    this.initEvents()
  }

  init() {
    this.isActive = window.tracking.trackingIsActive

    if(this.isActive) {
      this.cookie = new Cookie()
    }
  }

  initEvents() {
    if(this.isActive) {
      this.eventBus.on("page-view", this.sendPageView.bind(this))
    }
  }

  sendPageView() {
    if(this.cookie.cookies.GoogleTagManager)
      this.sendPageViewGTM()

    if(this.cookie.cookies.FacebookPixel)
      this.sendPageViewFB()

    if(this.cookie.cookies.GoogleAnalytics)
      this.sendPageViewGA()
  }

  sendPageViewGTM() {
    //console.log("Page view : GTM")
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'pageview',
    })
  }

  sendPageViewGA() {
    //console.log("Page view : GA")
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'pageview',
    })
  }

  sendPageViewFB() {
    //console.log("Page view : FB")
    window.fbq('track', 'PageView')
  }
}