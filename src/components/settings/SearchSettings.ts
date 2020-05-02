import { Component, Vue } from 'vue-property-decorator'
import { SET_BOOL_SETTING } from '../../store/settings/types'

@Component
export default class SearchSettingsComponent extends Vue {
  public get searchInNewTab () {
    return this.$store.getters.settings.searchInNewTab
  }

  public set searchInNewTab (val: boolean) {
    this.$store.dispatch(SET_BOOL_SETTING, {
      field: 'searchInNewTab',
      value: val
    })
  }
}
