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
  public date = ''

  public resetModel () {
    this.date = formatDate(new Date(), 'YYYY/MM/DD')
    this.model = {
      id: uuidv4(),
      timestamp: 0,
      title: '',
      link: '',
      message: '',
      postNotification: true
    }
  }

  public postNotification () {
    const model = {
      ...this.model,
      timestamp: Math.round(new Date().getTime() / 1000) // new Date(this.date).getTime() / 1000
    }

    this.$firebaseDb.collection('notifications').doc(this.model.id).set(model).then(() => {
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
