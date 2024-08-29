import { $html } from "@/utils/dom"

export default class Sizes {
  static instance

  constructor() {
    if(Sizes.instance)
      return Sizes.instance

    this.window = {
      height: 0,
      width: 0,
    }

    this.resize()
  }

  resize() {
    this.window.width = $html.innerWidth
    this.window.height = $html.innerHeight
  }
}