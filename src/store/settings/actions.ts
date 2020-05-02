import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { SettingsStateInterface } from './state'
import dbService from '../../services/dbService'
import { LOAD_SETTINGS, SET_BOOL_SETTING, SET_STATE } from './types'

const actions: ActionTree<SettingsStateInterface, StoreInterface> = {
  [SET_BOOL_SETTING] ({ commit, state }, payload) {
    commit(SET_BOOL_SETTING, payload)
    return dbService.save('settings', state)
  },
  [LOAD_SETTINGS] ({ commit }) {
    dbService.get('settings').then((model: SettingsStateInterface) => {
      commit(SET_STATE, model)
    })
  }
}

export default actions
