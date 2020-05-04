import { Component, Vue } from 'vue-property-decorator'
import dbService from '../../../../services/dbService'

interface GroupedBookmark {
  label: string;
  level: number;
  url: string;
  children: GroupedBookmark[];
}

interface Bookmark {
  url: string;
  label?: string;
}

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
  public addPartsToNode (parentNode: GroupedBookmark[], url: string, level: number, parentUrl: string) {
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
        children: []
      }

      parentNode.push(node)
    }

    this.addPartsToNode(node.children, parts[1], level + 1, thisUrl)
  }

  public groupBookmarks (bookmarks: Bookmark[]) {
    for (const bookmark of bookmarks) {
      // Going forward we might bookmark more sites but for now, remove quasar.dev so it doesn't work as a top level node
      const quasarUrl = 'https://quasar.dev/'
      const url = bookmark.url.replace(quasarUrl, '')
      this.addPartsToNode(this.groupedBookmarks, url, 1, quasarUrl.substr(0, quasarUrl.length - 1))
    }
  }

  public prettyBookmarks (bookmarks: Bookmark[]) {
    for (const bookmark of bookmarks) {
      let lastIndex = bookmark.url.lastIndexOf('#')
      if (lastIndex === -1) {
        lastIndex = bookmark.url.lastIndexOf('/')
      }

      this.bookmarks.push({
        label: bookmark.url.substring(lastIndex),
        url: bookmark.url
      })
    }
  }

  public loadBookmarks () {
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

  public mounted () {
    this.loadBookmarks()
  }
}
