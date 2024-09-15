import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import * as core from '@/animations/core'
import { TRIGGERBASE } from '@/settings/config.animations'
import { splitText } from '@/utils/dom'
import { parseString } from '@/utils/string'

// Lines : Line By Line animation
// <div data-ref="box" data-anim="lines">
// </div> 
export function lines(item) {
  let options = { start: "top bottom-=20%", end: "top bottom-=20%", delay: 0 }
  const splittedItem = splitText(item, 'lines')

  if(item.dataset.options)
    options = Object.assign(options, parseString(item.dataset.options))

  const tl = gsap.timeline({onComplete: () => {
    splittedItem.revert()
  }})

  tl.add(core.staggerY(splittedItem.lines), 0)
  tl.add(core.fadeIn(splittedItem.lines), 0)
  tl.pause()

  return ScrollTrigger.create({
    trigger: splittedItem.elements,
    animation: tl,
    start: "top bottom",
    end: "top bottom",
    toggleActions: 'play none none none',
    once: true,
  })
}

export function fadeYIn(item) {
  let options = { start: "top bottom-=20%", end: "top bottom-=20%", delay: 0 }
  const tl = gsap.timeline()

  if(item.dataset.options)
    options = Object.assign(options, parseString(item.dataset.options))

  tl.add(core.staggerY(item), 0)
  tl.add(core.fadeIn(item), 0)
  tl.pause()

  return ScrollTrigger.create({
    trigger: item,
    animation: tl,
    start: options.start,
    end: options.end,
    delay: options.delay,
    toggleActions: 'play none none none',
    once: true,
  })
}

// Parallax : Parallax animation
// <div data-ref="box" data-anim="parallax" data-options="start:60,end:-60">
// </div> 
export function parallax(item) {  
  let options = { start: 60, end: -60 }

  if(item.dataset.options)
    options = Object.assign(options, parseString(item.dataset.options))

  return gsap.timeline(
    {
      scrollTrigger:{
        trigger: item, 
        start: "top bottom",
        end: "bottom top",
        ease: "linear",
        scrub: 1
      }
    })
  .fromTo(item, { y: options.start }, { y: options.end })
}

// Inset : Clip Path Inset animation
// <div data-ref="box" data-anim="inset" data-options="start:0% 50% 100% 50%">
// </div> 
export function inset(item) {
  let options = { start: "0% 50% 100% 50%", end: "0% 0% 0% 0%", duration: 1.4, ease: "power3.out", delay: 0 }

  if(item.dataset.options)
    options = Object.assign(options, parseString(item.dataset.options))

  return ScrollTrigger.create({
    trigger: item,
    ...TRIGGERBASE,
    animation: gsap.fromTo(
      item,
      {
        clipPath: `inset(${options.start})`,
        autoAlpha: 0
      }, 
      {
        clipPath: `inset(${options.end})`,
        duration: options.duration, 
        autoAlpha: 1, 
        ease: options.ease,
        delay: options.delay
      },
    )
  })
}

// Ellipse : Clip Path Ellipse animation
// <div data-ref="box" data-anim="ellipse" data-options="start:0% 50% 100% 50%">
// </div> 
export function ellipse(item) {
  let options = { start: "0% 0% at 50% 0%", end: "150% 150% at 50% 0%", duration: 3, ease: "cubic.out", delay: 0 }

  if(item.dataset.options)
    options = Object.assign(options, parseString(item.dataset.options))

  return ScrollTrigger.create({
    trigger: item,
    ...TRIGGERBASE,
    animation: gsap.fromTo(
      item,
      {
        clipPath: `ellipse(${options.start})`,
      }, 
      {
        clipPath: `ellipse(${options.end})`,
        duration: options.duration, 
        ease: options.ease,
        delay: options.delay
      },
    )
  })
}