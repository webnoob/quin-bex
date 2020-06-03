import Vue from 'vue'
import * as firebase from 'firebase'

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: firebase.app.App;
    $firebaseDb: firebase.firestore.Firestore;
  }
}
