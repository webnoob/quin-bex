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
import { SearchResultInterface } from '../types'
import SearchResults from 'components/SearchResults'

interface AlgoliaSearchResult {
  anchor: string;
  content?: string;
  hierarchy: {
    lvl0: string;
    lvl1: string;
    lvl2: string;
    lvl3: string;
    lvl4: string;
    lvl5: string;
    lvl6: string;
  };
  objectID: string;
  url: string;
}

const hitsPerPage = 7

@Component({
  // @ts-ignore
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
    drawerLayout: DrawerLayout,
    SearchResults
  }
})
export default class PopoutLayout extends Vue {
  public leftDrawerState = false
  public rightDrawerState = false
  public settingDrawerState = false
  public settingsSelection = ''
  public search = ''
  public searchResults: SearchResultInterface[] = []

  public get savedSearch () {
    return this.$store.getters.settings.search
  }

  public set savedSearch (value: string) {
    this.$store.dispatch(SET_STRING_SETTING, {
      field: 'search',
      value
    })
  }

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
          hitsPerPage: hitsPerPage
        },
        transformData: (hits: AlgoliaSearchResult[]) => {
          this.searchResults = this.transformSearchResults(hits)
        }
      })

      this.search = this.savedSearch
      // @ts-ignore
      this.$refs.docAlgolia.focus()
      setTimeout(() => {
        // @ts-ignore
        this.$refs.docAlgolia.$refs.input.dispatchEvent(new Event('input', {
          bubbles: true
        }))
      })
    })
  }

  public doOnSearchInput () {
    this.savedSearch = this.search
    if (this.search === '') {
      this.searchResults = []
    }
  }

  private htmlDecode (input: string) {
    const doc = new DOMParser().parseFromString(input, 'text/html')
    return doc.documentElement.textContent || ''
  }

  private transformSearchResults (results: AlgoliaSearchResult[]): SearchResultInterface[] {
    const allResults: SearchResultInterface[] = []
    for (const result of results) {
      let existingGroup = allResults.find(f => f.groupName === result.hierarchy.lvl0)
      if (existingGroup === void 0) {
        existingGroup = {
          groupName: result.hierarchy.lvl0,
          children: []
        }
        allResults.push(existingGroup)
      }

      const items: string[] = []
      for (let i = 1; i < hitsPerPage; i++) {
        const text = result.hierarchy['lvl' + i]
        if (text) {
          items.push(this.htmlDecode(text))
        }
      }

      existingGroup.children.push({
        url: result.url,
        id: result.objectID,
        items
      })
    }
    return allResults
  }
}
