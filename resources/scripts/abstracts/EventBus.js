/* https://lwebapp.com/en/post/event-bus */

export default class EventBus {
  static instance;

  constructor() {
    if (EventBus.instance) return EventBus.instance;

    EventBus.instance = this;

    this.eventObject = {};
    this.callbackId = 0;
  }

  emit(eventName, ...args) {
    const callbackObject = this.eventObject[eventName];

    if (!callbackObject) return;

    for (let id in callbackObject) {
      callbackObject[id](...args);

      if (id[0] === "d") {
        delete callbackObject[id];
      }
    }
  }
  
  on(eventName, callback) {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = {};
    }
    
    const id = this.callbackId++;

    this.eventObject[eventName][id] = callback;

    const off = () => {
      delete this.eventObject[eventName][id];

      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };

    return { off };
  }

  onOnce(eventName, callback) {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = {};
    }

    const id = "d" + this.callbackId++;

    this.eventObject[eventName][id] = callback;

    const off = () => {
      delete this.eventObject[eventName][id];

      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };

    return { off };
  }

  clear(eventName) {
    if (!eventName) {
      this.eventObject = {};
      return;
    }

    delete this.eventObject[eventName];
  }
}
