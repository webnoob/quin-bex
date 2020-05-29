import { Component, Prop, Vue } from 'vue-property-decorator'
import { SearchResult } from '../types'

@Component
export default class SearchResults extends Vue {
  @Prop({ type: Array }) public readonly data!: SearchResult[]

  public navigateTo (url: string) {
    this.$q.bex.send('redirect.user', {
      url: url,
      openInNewTab: this.$store.getters.settings.searchInNewTab
    })
  }
}
