import { Component, Vue } from 'vue-property-decorator'
import Notifications from 'components/tabs/Notifications'
import SearchSettings from 'components/settings/SearchSettings'
import BookmarkSettings from 'components/settings/BookmarkSettings'
import { LOAD_SETTINGS, SET_STRING_SETTING } from '../store/settings/types'
import QuasarLinks from 'components/QuasarLinks'
import SettingsIndex from 'components/settings'
import DrawerLayout from 'components/DrawerLayout'
import Bookmarks from 'components/tabs/bookmarks/Bookmarks'
import BookmarksTree from 'components/tabs/bookmarks/BookmarksTree'
import BookmarksList from 'components/tabs/bookmarks/BookmarksList'

@Component({
  async preFetch ({ store }) {
    await store.dispatch(LOAD_SETTINGS)
  },
  components: {
    Notifications,
    Bookmarks,
    bookmarksTree: BookmarksTree,
    bookmarksList: BookmarksList,
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
  public search = ''
  public settingsSelection = ''

  public get selectedTab () {
    return this.$store.getters.settings.lastTab
  }

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

  public get bookmarksComponent () {
    if (this.$store.getters.settings.groupBookmarksList === true) {
      return 'bookmarks-list'
    } else if (this.$store.getters.settings.groupBookmarksTree === true) {
      return 'bookmarks-tree'
    } else {
      return 'bookmarks'
    }
  }

  public tabChanged (tab: string) {
    this.$store.dispatch(SET_STRING_SETTING, {
      field: 'lastTab',
      value: tab
    })
  }

  public openSettings (selection: string) {
    this.settingDrawerState = true
    this.settingsSelection = selection
  }

  public mounted () {
    import('docsearch.js').then((docSearch: any) => {
      docSearch.default({
        apiKey: '5c15f3938ef24ae49e3a0e69dc4a140f',
        indexName: 'quasar-framework',
        inputSelector: '.doc-algolia input',
        algoliaOptions: {
          hitsPerPage: 7
        },
        handleSelected: (a: any, b: any, suggestion: any) => {
          this.$q.bex.send('redirect.user', {
            url: suggestion.url,
            openInNewTab: this.$store.getters.settings.searchInNewTab
          })
        }
      })
    })
  }
}
