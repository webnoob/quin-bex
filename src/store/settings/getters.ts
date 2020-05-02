import { GetterTree } from 'vuex'
import { StoreInterface } from '../index'
import { SettingsStateInterface } from './state'

const getters: GetterTree<SettingsStateInterface, StoreInterface> = {
  settings (state): SettingsStateInterface {
    return state
  }
}

export default getters
