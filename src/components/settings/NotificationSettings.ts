import { Component, Vue } from 'vue-property-decorator'
import { SET_BOOL_SETTING } from '../../store/settings/types'

@Component
export default class NotificationSettings extends Vue {
  public get quasarNotificationsEnabled () {
    return this.$store.getters.settings.quasarNotificationsEnabled
  }

  public set quasarNotificationsEnabled (val: boolean) {
    this.$store.dispatch(SET_BOOL_SETTING, {
      field: 'quasarNotificationsEnabled',
      value: val
    })
  }
}
