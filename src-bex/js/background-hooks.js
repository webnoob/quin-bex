// Hooks added here have a bridge allowing communication between the BEX Background Script and the BEX Content Script.
// Note: Events sent from this background script using `bridge.send` can be `listen`'d for by all client BEX bridges for this BEX

// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/background-hooks
import { v4 as uuidv4 } from 'uuid'
let Bridge
export default function attachBackgroundHooks (bridge /* , allActiveConnections */) {
  Bridge = bridge
  bridge.on('storage.get', event => {
    const payload = event.data
    if (payload.key === null) {
      chrome.storage.local.get(null, r => {
        const result = []

        // Group the items up into an array to take advantage of the bridge's chunk splitting.
        for (const itemKey in r) {
          result.push(r[itemKey])
        }
        bridge.send(event.eventResponseKey, result)
      })
    } else {
      chrome.storage.local.get([payload.key], r => {
        bridge.send(event.eventResponseKey, r[payload.key])
      })
    }
  })

  bridge.on('storage.set', event => {
    const payload = event.data
    chrome.storage.local.set({ [payload.key]: payload.data }, () => {
      bridge.send(event.eventResponseKey, payload.data)
    })
  })

  bridge.on('storage.remove', event => {
    const payload = event.data
    chrome.storage.local.remove(payload.key, () => {
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
            bridge.send('redirect.quasar.bg', event.data)
            found = true
          }
        }

        if (found === false) {
          chrome.tabs.create({ url })
        }
      })
    }
  })

  bridge.on('add.bookmark.bg', event => {
    const key = 'bookmark.' + uuidv4()
    const model = {
      type: 'bookmark',
      url: event.data.url
    }
    chrome.storage.local.set({
      [key]: model
    }, () => {
      // nothing
    })

    bridge.send(event.eventResponseKey, {
      ...model,
      key
    })
  })

  bridge.on('remove.bookmark.bg', event => {
    chrome.storage.local.remove(event.data.key)
  })
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.toLowerCase().indexOf('quasar.dev') > -1 && changeInfo.status === 'complete') {
    chrome.storage.local.get(null, r => {
      const result = []

      // Group the items up into an array to take advantage of the bridge's chunk splitting.
      for (const itemKey in r) {
        result.push({
          key: itemKey,
          ...r[itemKey]
        })
      }

      const bookmarks = result.filter(f => f.type === 'bookmark')
      Bridge.send('dom.bookmarks.bg', {
        bookmarks
      })
    })
  }
})
