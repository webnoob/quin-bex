// Hooks added here have a bridge allowing communication between the Web Page and the BEX Content Script.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/dom-hooks

import detectQuasar from 'app/src-bex/js/detect-quasar'

export default function attachDomHooks (bridge) {
  detectQuasar(bridge)

  bridge.on('dom.bookmarks', event => {
    const existingBookmarks = event.data.bookmarks || []
    const allHeadings = document.querySelectorAll('.doc-h2, .doc-h3')
    const href = window.location.href
    const anchorIndex = window.location.href.indexOf('#')
    const domain = href.substring(0, anchorIndex > -1 ? anchorIndex : href.length)

    // Remove existing bookmark icons. this is easier than look for the ones we've already added as we don't have
    // consistent ids to select.
    ;[].forEach.call(document.querySelectorAll('.quin-injected-icon'), (e) => {
      e.parentNode.removeChild(e)
    })

    for (const el of allHeadings) {
      const thisUrl = domain + '#' + el.id
      let existingBookmark = existingBookmarks.find(s => s.url === thisUrl)
      let alreadyBookmarked = existingBookmark !== void 0

      // inject our bookmark icon
      const item = document.createElement('i')
      item.className = 'quin-injected-icon material-icons'
      el.append(item)

      let createRemoveBookmarkHandler = void 0
      let createAddBookmarkHandler = void 0

      // Handler for the delete bookmark. Will unsubscribe itself and attach an add bookmark listener instead
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

      // Handler for the add bookmark. Will unsubscribe itself and attach a remove bookmark listener instead
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

      // Create our handlers for the icon depending on whether it's been added already or not.
      if (alreadyBookmarked) {
        item.innerText = 'bookmark'
        createRemoveBookmarkHandler(item)
      } else {
        item.innerText = 'bookmark_border'
        createAddBookmarkHandler(item)
      }
    }
  })

  bridge.on('redirect.quasar', event => {
    const qInstance = document.getElementById('q-app').__vue__
    if (event.data.existingUrl.indexOf(qInstance.$parent._route.fullPath) > -1) {
      qInstance.$parent._router.push(event.data.url.replace('https://quasar.dev', ''))
    }
  })
}
