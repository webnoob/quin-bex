import { MutationTree } from 'vuex'
import { SettingsStateInterface } from './state'
import { SET_BOOL_SETTING, SET_STATE, SET_STRING_SETTING } from './types'

const mutation: MutationTree<SettingsStateInterface> = {
  [SET_BOOL_SETTING] (state, payload: { field: string; value: boolean}) {
    Object.assign(state, {
      ...state,
      [payload.field]: payload.value
    })
  },
  [SET_STRING_SETTING] (state, payload: { field: string; value: string}) {
    Object.assign(state, {
      ...state,
      [payload.field]: payload.value
    })
  },
  [SET_STATE] (state, payload: SettingsStateInterface) {
    if (payload !== void 0) {
      Object.assign(state, payload)
    }
  }
}

export default mutation
