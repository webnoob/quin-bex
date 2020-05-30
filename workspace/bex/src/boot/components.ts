import { boot } from 'quasar/wrappers'
import BookmarksListItem from 'components/tabs/bookmarks/BookmarksListItem'

export default boot(({ Vue }) => {
  Vue.component('BookmarksListItem', BookmarksListItem)
})
