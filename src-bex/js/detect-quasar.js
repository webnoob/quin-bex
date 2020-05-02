function initQuasar (bridge, quasarInstance, vue) {
  bridge.send('quasar.detect', {
    version: quasarInstance.version,
    dark: {
      isActive: quasarInstance.dark ? quasarInstance.dark.isActive : void 0
    },
    umd: quasarInstance.umd,
    iconSet: {
      name: quasarInstance.iconSet.name,
      __installed: quasarInstance.iconSet.__installed
    },
    lang: {
      rtl: quasarInstance.lang.rtl
    }
  })

  window.__QUASAR_DEVTOOLS__ = {
    Quasar: quasarInstance,
    Vue: vue
  }
}

export default function detectQuasar (bridge) {
  if (window.Quasar) { // UMD
    initQuasar(bridge, {
      version: window.Quasar.version,
      dark: window.Quasar.Dark,
      ...window.Quasar,
      umd: true
    })
  } else { // CLI
    setTimeout(() => {
      const all = document.querySelectorAll('*')
      let el
      for (let i = 0; i < all.length; i++) {
        if (all[i].__vue__) {
          el = all[i]
          break
        }
      }

      if (el) {
        let Vue = Object.getPrototypeOf(el.__vue__).constructor
        console.log(Vue)
        while (Vue.super) {
          Vue = Vue.super
        }
        if (Vue.prototype.$q) {
          initQuasar(bridge, Vue.prototype.$q, Vue)
        }
      }
    }, 100)
  }
}
