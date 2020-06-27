// Hooks added here have a bridge allowing communication between the BEX Background Script and the BEX Content Script.
// Note: Events sent from this background script using `bridge.send` can be `listen`'d for by all client BEX bridges for this BEX

// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/background-hooks
import db from 'app/src-bex/js/lib/db'
import { firebaseDb } from 'boot/firebase'

let Bridge

const sendBookmarksToDom = () => {
  db.getByType('bookmark').then(bookmarks => {
    Bridge.send('dom.bookmarks.bg', {
      bookmarks
    })
  })
}

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

chrome.storage.local.get('settings', r => {
  const settings = r.settings

  // Default settings or overidden
  if (settings === void 0 || settings.quasarNotificationsEnabled) {
    // If this is the first time the BEX has been run (installed) then don't sync all the previous notifications
    // instead, we store a date in the DB and use that as the basis for further notification lookups.
    const now = Math.round(new Date().getTime() / 1000)
    let lastNotificationSyncDateTime = settings === void 0 ? now : settings.lastNotificationSyncDateTime
    if (settings === void 0 || settings.lastNotificationSyncDateTime === void 0) {
      lastNotificationSyncDateTime = now
      db.set('lastNotificationSyncDateTime', lastNotificationSyncDateTime)
    }

    // .where('timestamp', '>', lastNotificationSyncDateTime)
    console.log(lastNotificationSyncDateTime)
    firebaseDb.collection('notifications').where('timestamp', '>', lastNotificationSyncDateTime).onSnapshot((snapshot) => {
      db.getByType('notification').then(existingNotifications => {
        // Update the time we last got a notification to now.
        db.set('settings', {
          ...settings,
          lastNotificationSyncDateTime: Math.round(new Date().getTime() / 1000)
        })

        // Update our DB.
        snapshot.docChanges().forEach((change) => {
          const doc = change.doc.data()
          const existing = existingNotifications !== void 0
            ? existingNotifications.find(f => f.id === doc.id)
            : void 0

          switch (change.type) {
            case 'added':
              if (existing === void 0) {
                db.add('notification', doc).then(() => {
                  Bridge.send('new.notification', doc)
                  if (doc.postNotification) {
                    chrome.notifications.create(doc.id, {
                      type: 'basic',
                      iconUrl: '../icons/icon-48x48.png',
                      title: doc.title,
                      message: doc.message
                    }, () => {
                      // Do nothing
                    })
                  }
                })
              }
              break
            case 'modified':
              db.set('notification.' + doc.id, doc)
              break
            case 'removed':
              db.remove('notification.' + doc.id)
              break
          }
        })
      })
    })
  }
})
