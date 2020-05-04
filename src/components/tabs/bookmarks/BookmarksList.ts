import { Component } from 'vue-property-decorator'
import BookmarksMixin from './mixins/bookmarksMixin'

@Component
export default class BookmarksList extends BookmarksMixin {
  public created () {
    console.log('list')
    this.group = true
  }
}
