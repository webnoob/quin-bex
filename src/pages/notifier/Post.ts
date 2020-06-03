import { Component, Vue } from 'vue-property-decorator'
import { QuasarNotification } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { date } from 'quasar'
const { formatDate } = date

@Component({
  data () {
    return {
      model: {}
    }
  }
})
export default class NotifierIndexPage extends Vue {
  public model!: QuasarNotification

  public resetModel () {
    this.model = {
      id: uuidv4(),
      date: formatDate(new Date(), 'YYYY/MM/DD'),
      title: '',
      link: '',
      message: '',
      postNotification: true
    }
  }

  public postNotification () {
    this.$firebaseDb.collection('notifications').doc(this.model.id).set(this.model).then(() => {
      this.$q.notify({
        message: 'Notification Posted',
        color: 'positive',
        position: 'top'
      })
      this.resetModel()
    })
  }

  public created () {
    this.resetModel()
  }
}
