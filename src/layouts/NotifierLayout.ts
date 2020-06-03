import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NotifierLayout extends Vue {
  public logout () {
    this.$firebase.auth().signOut().then(() => {
      this.$router.push('/')
    })
  }
}
