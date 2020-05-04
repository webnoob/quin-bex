import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DrawerLayout extends Vue {
  @Prop({ type: Boolean }) public readonly value!: boolean

  public close () {
    this.$emit('input', false)
  }
}
