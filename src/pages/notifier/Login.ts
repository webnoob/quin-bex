import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NotifierLoginPage extends Vue {
  public emailAddress = ''
  public password = ''

  public login () {
    this.$firebase.auth().signInWithEmailAndPassword(this.emailAddress, this.password).catch((error) => {
      this.$q.notify({
        message: 'There was an error logging in: ' + error.message,
        color: 'negative',
        position: 'top'
      })
    }).then(user => {
      console.log(user)
      if (user !== void 0) {
        this.$q.notify({
          message: 'Logged in...',
          position: 'top'
        })
        this.$router.push('/post')
      }
    })
  }
}
