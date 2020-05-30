import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SettingsIndex extends Vue {
  @Prop({ type: String }) public readonly value!: string

  public openSetting (settingName: string) {
    this.$emit('input', settingName)
  }
}
