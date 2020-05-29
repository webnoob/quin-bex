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
import { AlgoliaSearchResult, SearchResult, SearchResultItem } from '../types'
import SearchResults from 'components/SearchResults'
import { QInput } from 'quasar'
import { v4 as uuidv4 } from 'uuid'

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
  public searchResults: SearchResult[] = []

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
      const algoliaInput = this.$refs.docAlgolia as QInput
      algoliaInput.focus()
      setTimeout(() => {
        algoliaInput.select()
        ;(algoliaInput.$refs.input as HTMLInputElement).dispatchEvent(new Event('input', {
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

  private transformSearchResults (results: AlgoliaSearchResult[]): SearchResult[] {
    const allResults: SearchResult[] = []

    for (const result of results) {
      // Get the first item and add it to our array as a group heading if it doesn't already exist.
      // Otherwise just return the existing one so we're not adding duplicates
      let existingGroup = allResults.find(f => f.groupName === result._highlightResult.hierarchy.lvl0.value)
      if (existingGroup === void 0) {
        existingGroup = {
          id: uuidv4(),
          groupName: result._highlightResult.hierarchy.lvl0.value,
          children: []
        }
        allResults.push(existingGroup)
      }

      // Now go through all our results (excluding the first one which we manually added) and add them as
      // children to the current group.
      const items: SearchResultItem[] = []
      for (let i = 1; i < hitsPerPage; i++) {
        const data = result._highlightResult.hierarchy['lvl' + i]
        if (data === void 0) break

        const text = data.value
        if (text) {
          items.push({
            id: uuidv4(),
            type: 'heading',
            text: text
          })
        }
      }

      // If there is a snippet then add it at the end.
      if (result._snippetResult) {
        let text = result._snippetResult.content.value

        // If our first char isn't a capital then it's cut in the middle of a sentence so ellipsis it.
        // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
        if (text[0] !== text[0].toUpperCase()) {
          text = '\u2026' + text
        }

        // If our last char isn't a sentence stopper, add ellipsis
        if (!['.', '!', '?'].includes(text[text.length - 1])) {
          text = text + '\u2026'
        }

        items.push({
          id: uuidv4(),
          type: 'content',
          text
        })
      }

      // Add the items we've just generated to our parent group
      existingGroup.children.push({
        url: result.url,
        id: result.objectID,
        items
      })
    }

    return allResults
  }
}
