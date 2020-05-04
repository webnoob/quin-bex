import { Component, Vue } from 'vue-property-decorator'
import { fabFacebook, fabGithub, fabTwitter } from '@quasar/extras/fontawesome-v5'
import { mdiBlogger, mdiBullhorn, mdiCharity, mdiChat, mdiForum } from '@quasar/extras/mdi-v4'

@Component
export default class QuasarLinksComponent extends Vue {
  public mdiChat = mdiChat
  public mdiForum = mdiForum
  public fabGithub = fabGithub
  public mdiBlogger = mdiBlogger
  public mdiBullhorn = mdiBullhorn
  public fabTwitter = fabTwitter
  public fabFacebook = fabFacebook
  public mdiCharity = mdiCharity

  public goTo (link: string) {
    this.$q.bex.send('redirect.user', {
      url: link,
      openInNewTab: true
    })
  }
}
