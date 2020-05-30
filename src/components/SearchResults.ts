import { Component, Prop, Vue } from 'vue-property-decorator'
import { SearchResult } from '../types'

@Component
export default class SearchResults extends Vue {
  @Prop({ type: Array }) public readonly data!: SearchResult[]

  private htmlDecode (input: string) {
    const doc = new DOMParser().parseFromString(input, 'text/html')
    return doc.documentElement.textContent || ''
  }

  public navigateTo (url: string) {
    this.$q.bex.send('redirect.user', {
      url: url,
      openInNewTab: this.$store.getters.settings.searchInNewTab
    })
  }
}
