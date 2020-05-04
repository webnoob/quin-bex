import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SettingsIndexComponent extends Vue {
  @Prop({ type: String }) public readonly value!: string

  public openSetting (settingName: string) {
    this.$emit('input', settingName)
  }
}
