import { Component, Vue } from 'vue-property-decorator'
import dbService from '../../../../services/dbService'
import { Bookmark, GroupedBookmark } from '../../../../types'

@Component
export default class BookmarksMixin extends Vue {
  public group = false
  public bookmarks: Bookmark[] = []
  public groupedBookmarks: GroupedBookmark[] = []

  /**
   * Get an array with 2 parts. 1 containing the text up to the first / then the remainder as the second part.
   * If no slashes found, look for a # instead.
   * @param url
   */
  public getUrlParts (url: string) {
    if (url === void 0) return []

    return url.includes('/')
      ? url.split(/\/(.+)/).filter(f => f !== '')
      : url.split(/#(.+)/).filter(f => f !== '')
  }

  /**
   * Go down a url splitting it into parts (recursively) and add child elements to parentNode
   * @param parentNode
   * @param url
   * @param level
   */
  public addPartsToNode (parentNode: GroupedBookmark[], url: string, level: number, parentUrl: string, bookmark: Bookmark) {
    const parts = this.getUrlParts(url)
    if (parts.length === 0) return

    let node = parentNode.find(f => f.label === parts[0])
    const separator = parts.length > 1 ? '/' : '#'
    const thisUrl = node?.url || [parentUrl, separator, parts[0]].join('')

    if (node === void 0) {
      node = {
        label: parts[0],
        level,
        url: thisUrl,
        children: [],
        bookmark
      }

      parentNode.push(node)
    }

    this.addPartsToNode(node.children, parts[1], level + 1, thisUrl, bookmark)
  }

  public groupBookmarks (bookmarks: Bookmark[]) {
    for (const bookmark of bookmarks) {
      // Going forward we might bookmark more sites but for now, remove quasar.dev so it doesn't work as a top level node
      const quasarUrl = 'https://quasar.dev/'
      const url = bookmark.url.replace(quasarUrl, '')
      this.addPartsToNode(this.groupedBookmarks, url, 1, quasarUrl.substr(0, quasarUrl.length - 1), bookmark)
    }
  }

  public prettyBookmarks (bookmarks: Bookmark[]) {
    for (const bookmark of bookmarks) {
      let lastIndex = bookmark.url.lastIndexOf('#')
      if (lastIndex === -1) {
        lastIndex = bookmark.url.lastIndexOf('/')
      }

      this.bookmarks.push({
        id: bookmark.id,
        url: bookmark.url,
        label: bookmark.url.substring(lastIndex)
      })
    }
  }

  public loadBookmarks () {
    this.groupedBookmarks = []
    this.bookmarks = []
    dbService.getAll('bookmark').then(bookmarks => {
      if (this.group === true) {
        this.groupBookmarks(bookmarks)
      } else {
        this.prettyBookmarks(bookmarks)
      }
    })
  }

  public redirectToBookmark (bookmark: Bookmark) {
    this.$q.bex.send('redirect.user', {
      url: bookmark.url,
      openInNewTab: this.$store.getters.settings.openBookmarksInNewTab
    })
  }

  public deleteBookmark (bookmark: Bookmark) {
    // Not using the db service here as using the bg hook version will automatically send the new bookmark list to the dom
    // and remove the bookmarked icon.
    this.$q.bex.send('remove.bookmark.bg', {
      key: 'bookmark.' + bookmark.id
    }).then(() => {
      this.loadBookmarks()
    })
  }

  public mounted () {
    this.loadBookmarks()
  }
}
