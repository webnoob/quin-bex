import { Module } from 'vuex'
import { StoreInterface } from '../index'
import state, { SettingsStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const module: Module<SettingsStateInterface, StoreInterface> = {
  actions,
  getters,
  mutations,
  state
}

export default module
