// Hooks added here have a bridge allowing communication between the Web Page and the BEX Content Script.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/dom-hooks

import detectQuasar from 'app/src-bex/js/detect-quasar'

/*
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
*/

export default function attachDomHooks (bridge) {
  detectQuasar(bridge)

  bridge.on('dom.bookmarks', event => {
    const existingBookmarks = event.data.bookmarks || []
    const allHeadings = document.querySelectorAll('.doc-h2, .doc-h3')
    const href = window.location.href
    const anchorIndex = window.location.href.indexOf('#')
    const domain = href.substring(0, anchorIndex > -1 ? anchorIndex : href.length)

    for (const el of allHeadings) {
      const thisUrl = domain + '#' + el.id
      let existingBookmark = existingBookmarks.find(s => s.url === thisUrl)
      let alreadyBookmarked = existingBookmark !== void 0

      // Can't do the item check like this because not all Quasars heading ids are valid ids ie:
      // #Submitting-to-a-URL-(native-form-submit)
      // Instead we have to assume the heading structure won't change and use childNodes
      // let item = document.querySelector('#' + el.id + ' i.quin-injected-icon')
      let item
      if (el.childNodes.length === 1) {
        item = document.createElement('i')
        item.className = 'quin-injected-icon material-icons'
        el.append(item)
      } else {
        item = el.childNodes[1]
      }

      let createRemoveBookmarkHandler = void 0
      let createAddBookmarkHandler = void 0

      createRemoveBookmarkHandler = (item) => {
        const cb = (e) => {
          e.stopPropagation()
          e.target.innerText = 'bookmark_border'
          bridge.send('remove.bookmark', {
            key: existingBookmark.key
          })
          const index = existingBookmarks.indexOf(existingBookmark)
          existingBookmarks.splice(index, 0)
          alreadyBookmarked = false
          existingBookmark = void 0
          item.removeEventListener('click', cb)
          createAddBookmarkHandler(item)
        }

        item.addEventListener('click', cb)
      }

      createAddBookmarkHandler = (item) => {
        const cb = (e) => {
          e.stopPropagation()
          e.target.innerText = 'bookmark'
          bridge.send('add.bookmark', {
            url: thisUrl
          }).then(payload => {
            existingBookmark = payload.data
            alreadyBookmarked = true
            existingBookmarks.push(payload.data)
            item.removeEventListener('click', cb)
            createRemoveBookmarkHandler(item)
          })
        }

        item.addEventListener('click', cb)
      }

      if (alreadyBookmarked) {
        item.innerText = 'bookmark'
        createRemoveBookmarkHandler(item)
      } else {
        item.innerText = 'bookmark_border'
        createAddBookmarkHandler(item)
      }
    }
  })

  /*
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
  */
}
