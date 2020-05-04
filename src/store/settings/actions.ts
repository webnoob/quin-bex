import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { SettingsStateInterface } from './state'
import dbService from '../../services/dbService'
import { LOAD_SETTINGS, SAVE_SETTINGS, SET_BOOL_SETTING, SET_STATE, SET_STRING_SETTING } from './types'

const actions: ActionTree<SettingsStateInterface, StoreInterface> = {
  [SET_BOOL_SETTING] ({ commit, dispatch }, payload) {
    commit(SET_BOOL_SETTING, payload)
    return dispatch(SAVE_SETTINGS)
  },
  [SET_STRING_SETTING] ({ commit, dispatch }, payload) {
    commit(SET_STRING_SETTING, payload)
    return dispatch(SAVE_SETTINGS)
  },
  [LOAD_SETTINGS] ({ commit }) {
    return dbService.get('settings').then((model: SettingsStateInterface) => {
      console.log(model)
      commit(SET_STATE, model)
    })
  },
  [SAVE_SETTINGS] ({ state }) {
    return dbService.save('settings', state)
  }
}

export default actions
