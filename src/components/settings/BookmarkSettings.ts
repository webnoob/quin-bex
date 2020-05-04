import { Component, Vue } from 'vue-property-decorator'
import { SET_BOOL_SETTING } from '../../store/settings/types'

@Component
export default class BookmarkSettings extends Vue {
  public get openBookmarksInNewTab () {
    return this.$store.getters.settings.openBookmarksInNewTab
  }

  public set openBookmarksInNewTab (val: boolean) {
    this.$store.dispatch(SET_BOOL_SETTING, {
      field: 'openBookmarksInNewTab',
      value: val
    })
  }

  public get groupByList () {
    return this.$store.getters.settings.groupBookmarksList
  }

  public set groupByList (val: boolean) {
    this.$store.dispatch(SET_BOOL_SETTING, {
      field: 'groupBookmarksList',
      value: val
    })
  }

  public set groupByTree (val: boolean) {
    this.$store.dispatch(SET_BOOL_SETTING, {
      field: 'groupBookmarksTree',
      value: val
    })
  }

  public get groupByTree () {
    return this.$store.getters.settings.groupBookmarksTree
  }
}
