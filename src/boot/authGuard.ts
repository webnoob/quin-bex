import { boot } from 'quasar/wrappers'
import * as firebase from 'firebase'

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (firebase.auth().currentUser !== null) {
        next() // All good, let can pass
      } else {
        console.error('You shall not pass!')
        router.push('/')
      }
    } else {
      next() // Page doesn't require auth, let them in.
    }
  })
})
