// Hooks added here have a bridge allowing communication between the BEX Background Script and the BEX Content Script.
// Note: Events sent from this background script using `bridge.send` can be `listen`'d for by all client BEX bridges for this BEX

// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/background-hooks
import { initFirebase } from './lib/firebase'
import db from 'app/src-bex/js/lib/db'

let Bridge

const sendBookmarksToDom = () => {
  db.getByType('bookmark').then(bookmarks => {
    Bridge.send('dom.bookmarks.bg', {
      bookmarks
    })
  })
}

initFirebase(Bridge)

export default function attachBackgroundHooks (bridge /* , allActiveConnections */) {
  Bridge = bridge

  bridge.on('storage.get', event => {
    const payload = event.data
    if (payload.key === null) {
      db.getAll().then(result => {
        bridge.send(event.eventResponseKey, result)
      })
    } else {
      db.getByKey(payload.key).then(result => {
        bridge.send(event.eventResponseKey, result)
      })
    }
  })

  bridge.on('storage.set', event => {
    const payload = event.data
    db.set(payload.key, payload.data).then(() => {
      bridge.send(event.eventResponseKey, payload.data)
    })
  })

  bridge.on('storage.remove', event => {
    const payload = event.data
    db.remove(payload.key).then(() => {
      bridge.send(event.eventResponseKey, payload.data)
    })
  })

  bridge.on('redirect.user', event => {
    const url = event.data.url
    const openInNewTab = event.data.openInNewTab
    if (openInNewTab) {
      chrome.tabs.create({ url })
    } else {
      chrome.tabs.query({
        currentWindow: true
      }, tabs => {
        let found = false
        for (const tab of tabs) {
          if (tab.url.indexOf('quasar.dev') > -1) {
            chrome.tabs.update(tab.id, { highlighted: true })
            bridge.send('redirect.quasar.bg', {
              url: event.data.url,
              existingUrl: tab.url
            })
            found = true
            break
          }
        }

        if (found === false) {
          chrome.tabs.create({ url })
        }
      })
    }
  })

  bridge.on('add.bookmark.bg', event => {
    db.add('bookmark', event.data).then(bookmark => {
      bridge.send(event.eventResponseKey, bookmark)
    })
  })

  bridge.on('remove.bookmark.bg', event => {
    db.remove(event.data.key).then(() => {
      bridge.send(event.eventResponseKey)
      sendBookmarksToDom()
    })
  })
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.toLowerCase().indexOf('quasar.dev') > -1 && changeInfo.status === 'complete') {
    sendBookmarksToDom()
  }
})
