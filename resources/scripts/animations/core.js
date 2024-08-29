import gsap from "gsap"

export function staggerY(items) {
  return gsap.from( items, { y: 60, duration: 0.9, stagger: 0.04, ease: 'power3.out' })
}

export function fadeIn(items) {
  return gsap.from( items, { autoAlpha: 0, duration: 0.9, ease: 'linear' })
}