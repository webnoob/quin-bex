import { Component, Vue } from 'vue-property-decorator'
import dbService from '../../services/dbService'
import { QuasarNotification } from '../../types'

@Component
export default class Notifications extends Vue {
  public notifications: QuasarNotification[] = []

  public viewMore (notification: QuasarNotification) {
    this.$q.bex.send('redirect.user', {
      url: notification.link,
      openInNewTab: true
    })
  }

  public mounted () {
    dbService.getAll('notification').then(notifications => {
      this.notifications = notifications
    })
  }
}
