import * as firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/analytics'
import 'firebase/firestore'
import chromeDb from './db'

export const initFirebase = (/* bridge */) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCyMcYQ9js4JUkun2XJVO35zh7eOoaWNQs',
    authDomain: 'quin-9b5be.firebaseapp.com',
    databaseURL: 'https://quin-9b5be.firebaseio.com',
    projectId: 'quin-9b5be',
    storageBucket: 'quin-9b5be.appspot.com',
    messagingSenderId: '882858287692',
    appId: '1:882858287692:web:15cd70beaa67f1f8594ae9',
    measurementId: 'G-CC6EP1582V'
  }

  firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()

  db.collection('notifications').onSnapshot((snapshot) => {
    chromeDb.getByType('notification').then(existingNotifications => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc.data()
        const existing = existingNotifications !== void 0
          ? existingNotifications.find(f => f.id === doc.id)
          : void 0

        switch (change.type) {
          case 'added':
            if (existing === void 0) {
              chromeDb.add('notification', doc).then(() => {
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
            chromeDb.set('notification.' + doc.id, doc)
            break
          case 'removed':
            chromeDb.remove('notification.' + doc.id)
            break
        }
      })
    })
  })
}
