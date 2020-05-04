import { Component } from 'vue-property-decorator'
import BookmarksMixin from './mixins/bookmarksMixin'
import BookmarksListItem from './BookmarksListItem'

@Component({
  components: {
    bookmarksListItem: BookmarksListItem
  }
})
export default class BookmarksList extends BookmarksMixin {
  public created () {
    this.group = true
  }
}
