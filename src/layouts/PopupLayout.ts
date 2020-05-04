import { Component, Vue } from 'vue-property-decorator'
import Notifications from 'components/tabs/Notifications'
import SearchSettings from 'components/settings/SearchSettings'
import BookmarkSettings from 'components/settings/BookmarkSettings'
import { LOAD_SETTINGS } from '../store/settings/types'
import QuasarLinks from 'components/QuasarLinks'
import SettingsIndex from 'components/settings'
import DrawerLayout from 'components/DrawerLayout'
import Bookmarks from 'components/tabs/Bookmarks'

@Component({
  preFetch ({ store }) {
    return store.dispatch(LOAD_SETTINGS)
  },
  components: {
    Notifications,
    Bookmarks,
    searchSettings: SearchSettings,
    bookmarkSettings: BookmarkSettings,
    quasarLinks: QuasarLinks,
    settings: SettingsIndex,
    drawerLayout: DrawerLayout
  }
})
export default class PopoutLayout extends Vue {
  public leftDrawerState = false
  public rightDrawerState = false
  public settingDrawerState = false
  public selectedTab = 'notifications'
  public search = ''
  public settingsSelection = ''

  public get settingsComponent () {
    switch (this.settingsSelection) {
      case 'search':
        return 'search-settings'
      case 'notifications':
        return 'notification-settings'
      case 'bookmarks':
        return 'bookmark-settings'
    }
  }

  public openSettings (selection: string) {
    this.settingDrawerState = true
    this.settingsSelection = selection
  }
}
