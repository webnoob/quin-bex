import { Component } from 'vue-property-decorator'
import BookmarksMixin from './mixins/bookmarksMixin'

@Component
export default class BookmarksTree extends BookmarksMixin {
  public created () {
    console.log('tree')
    this.group = true
  }
}
