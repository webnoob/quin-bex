import { Component, Prop, Vue } from 'vue-property-decorator'
import { Bookmark, GroupedBookmark } from './mixins/bookmarksMixin'

@Component
export default class BookmarksListItem extends Vue {
  @Prop({ type: Array }) public bookmarks!: GroupedBookmark[]

  public redirectToBookmark (bookmark: Bookmark) {
    this.$q.bex.send('redirect.user', {
      url: bookmark.url,
      openInNewTab: this.$store.getters.settings.openBookmarksInNewTab
    })
  }
}
