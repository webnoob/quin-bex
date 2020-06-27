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

  public loadNotifications () {
    dbService.getAll('notification').then((notifications: QuasarNotification[]) => {
      this.notifications = notifications.sort((a, b) => b.timestamp - a.timestamp)
    })
  }

  public mounted () {
    this.loadNotifications()
  }

  public created () {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$q.bex.on('new.notification', this.loadNotifications)
  }

  public beforeDestroy () {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.$q.bex.off('new.notification', this.loadNotifications)
  }
}
