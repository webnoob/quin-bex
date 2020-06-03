import { boot } from 'quasar/wrappers'
import * as firebase from 'firebase'

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

export default boot(({ Vue }) => {
  Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig)
  Vue.prototype.$firebaseDb = firebase.firestore()
})

export { firebaseConfig }
