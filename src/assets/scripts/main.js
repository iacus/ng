/* scripts/main.js */

'use strict'
// import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
import Debug from './modules/debug'
import Checks from './modules/checks'
// import PageLoader from './modules/loader'
// import Slider from './slider/slider'

// viewportUnitsBuggyfill.init()

const initFun = () => {
  new Debug().init()
  new Checks().init()
  // new PageLoader().init()
  // new Slider().init()
}


function documentReady (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn)
    console.log('Ready!')
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState !== 'loading') {
        fn()
      }
    })
  }
}
documentReady(initFun)
