// Hooks added here have a bridge allowing communication between the Web Page and the BEX Content Script.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/dom-hooks

import detectQuasar from 'app/src-bex/js/detect-quasar'

let searchBar = void 0
const findSearchBar = (nodes) => {
  if (searchBar !== void 0) return searchBar
  if (nodes !== void 0) {
    for (const node of nodes) {
      if (node.$vnode && node.$vnode.data && node.$vnode.data.ref === 'docAlgolia') {
        return node
      }

      if (node.$children.length > 0) {
        const found = findSearchBar(node.$children)
        if (found !== void 0) return found
      }
    }
  }
}

export default function attachDomHooks (bridge) {
  detectQuasar(bridge)

  bridge.on('dom.do.search', event => {
    console.log('**DOM DO SEARCH**')
    console.log(event.data)
    const qInstance = document.getElementById('q-app').__vue__
    console.log('QInstance')
    console.log(qInstance)

    const children = qInstance._vnode.componentInstance !== void 0 ? qInstance._vnode.componentInstance.$children : qInstance._vnode.children
    searchBar = findSearchBar(children)
    if (searchBar !== void 0) {
      searchBar.value = event.data.searchTerm
      setTimeout(() => {
        searchBar.$refs.input.dispatchEvent(new Event('input', {}))
      }, 400)
    }
  })
}
