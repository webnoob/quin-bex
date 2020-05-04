import { Component, Vue } from 'vue-property-decorator'
import dbService from '../../services/dbService'

@Component
export default class Bookmarks extends Vue {
  public bookmarks = []

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
}
