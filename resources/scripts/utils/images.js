import imagesLoaded from 'imagesloaded'

const preloadImages = (dom) => {
  if(dom) {
    return new Promise((resolve) => {
      imagesLoaded(dom, {background: true}, resolve)
    })
  }
}

export { 
  preloadImages,
}