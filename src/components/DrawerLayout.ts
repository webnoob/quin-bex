import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DrawerLayout extends Vue {
  @Prop({ type: Boolean }) public readonly value!: boolean
  @Prop({ type: String }) public readonly icon!: string

  public close () {
    this.$emit('input', false)
  }
}
