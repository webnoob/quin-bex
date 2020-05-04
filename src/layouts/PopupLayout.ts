import { Component, Vue } from 'vue-property-decorator'
import NotificationsComponent from 'components/Notifications'
import SearchSettingsComponent from 'components/settings/SearchSettings'
import BookmarkSettingsComponent from 'components/settings/BookmarkSettings'
import { LOAD_SETTINGS } from '../store/settings/types'
import dbService from '../services/dbService'
import QuasarLinksComponent from 'components/QuasarLinks'
import SettingsIndexComponent from 'components/settings'
import DrawerLayout from 'components/DrawerLayout'

@Component({
  preFetch ({ store }) {
    return store.dispatch(LOAD_SETTINGS)
  },
  components: {
    notifications: NotificationsComponent,
    searchSettings: SearchSettingsComponent,
    bookmarkSettings: BookmarkSettingsComponent,
    quasarLinks: QuasarLinksComponent,
    settings: SettingsIndexComponent,
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
  public bookmarks = []

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

  public loadBookmarks () {
    dbService.getAll('bookmark').then(bookmarks => {
      this.bookmarks = bookmarks
    })
  }

  public redirectToBookmark (bookmark: any) {
    this.$q.bex.send('redirect.user', {
      url: bookmark.url,
      openInNewTab: this.$store.getters.settings.openBookmarksInNewTab
    })
  }

  public mounted () {
    this.loadBookmarks()

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

  public openSettings (selection: string) {
    this.settingDrawerState = true
    this.settingsSelection = selection
  }
}
