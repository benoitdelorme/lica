import { componentsList } from '@/components'
import { IS_DEBUG, PREFIX, DEBUG } from '@/settings/config'
import Sizes from '@/abstracts/Sizes'
import { uIDG } from '@/utils/maths.js'

export default class ComponentsManager {
  static instance

  constructor() {
    if(ComponentsManager.instance)
      return ComponentsManager.instance
    
    ComponentsManager.instance = this

    this.DOM = {}
    this.components = []
    this.sizes = new Sizes()
    
    this.setEvents()
    
    window.componenstManager = this
  }
  
  setEvents() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  getComponent(uID) {
    return this.components.find(component => component.uID === uID)
  }

  mount(container = document) {
    this.DOM.components = [...container.querySelectorAll('[data-component]')]
    
    this.DOM.components.forEach(element => {
      const uID = `${PREFIX}${uIDG()}`
      const componentName = element.getAttribute('data-component')
      
      try {
        this.components.push(new componentsList[componentName]({
          target: element, 
          uID: uID,
        }))

        if (IS_DEBUG) {
          console.log(`%cComponent initialized: ${componentName}`, 'color: #bada55')
          element.setAttribute('data-s9', uID)
        }
      } 
      catch (error) {
        if (IS_DEBUG) {
          console.log(`%cError initializing component: ${componentName}`, 'color: #da5555')
        }
        
        if(DEBUG.logComponentsError) {
          console.log(error)
        }
      }

      if(!IS_DEBUG) {
        element.removeAttribute('data-component')
      }
    })
    
    if(IS_DEBUG) {
      window.components = this.components
      window.eventBus = this.eventBus
      console.log("Components", this.components)
    }
  }

  unmount() {
    const newComponents = []

    this.components.forEach(element => {
      if(typeof element.unmount === 'function') {
        element.unmount()
      }
      
      if(element.isStatic) {
        newComponents.push(element)
      }
    })

    for(let i = 0; i < this.components.length; i++) {
      delete this.components[i]
    }

    this.components = newComponents
  }

  resize() {
    this.sizes.resize()

    this.components.forEach(element => {
      if(typeof element.resize === 'function')
          element.resize()
    })
  }
}