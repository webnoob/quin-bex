import { Component, Vue } from 'vue-property-decorator'
import NotificationsComponent from 'components/Notifications'
import SearchSettingsComponent from 'components/settings/SearchSettings'
import BookmarkSettingsComponent from 'components/settings/BookmarkSettings'
import { LOAD_SETTINGS } from '../store/settings/types'

@Component({
  preFetch ({ store }) {
    return store.dispatch(LOAD_SETTINGS)
  },
  components: {
    notifications: NotificationsComponent,
    searchSettings: SearchSettingsComponent,
    bookmarkSettings: BookmarkSettingsComponent
  }
})
export default class PopoutLayout extends Vue {
  public leftDrawerState = false
  public settingDrawerState = false
  public selectedTab = 'notifications'
  public search = ''
  public settingsSelection = ''

  public get settingsComponent () {
    switch (this.settingsSelection) {
      case 'search': return 'search-settings'
      case 'notifications': return 'notification-settings'
      case 'bookmarks': return 'bookmark-settings'
    }
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

  public openSettings (selection: string) {
    this.settingDrawerState = true
    this.settingsSelection = selection
  }
}
