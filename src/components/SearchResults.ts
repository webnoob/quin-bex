import { Component, Prop, Vue } from 'vue-property-decorator'
import { SearchResultInterface } from '../types'

@Component
export default class SearchResults extends Vue {
  @Prop({ type: Array }) public readonly data!: SearchResultInterface[]

  public navigateTo (url: string) {
    console.log(url)
    this.$q.bex.send('redirect.user', {
      url: url,
      openInNewTab: this.$store.getters.settings.searchInNewTab
    })
  }
}
