import NProgress from 'nprogress'

import * as types from '@/stores/mutation-types'
import stub from '@/stores/stubs/user'

const state = {
  current: stub
}

const getters = {
  getCurrentUser: state => state.current,
  IsUserAuthenticated: state => state.current.id !== 0,
  IsUserAllowSeeNavigator: (state, getters) => {
    return getters.IsUserAuthenticated && state.current.intro === false
  }
}

const actions = {
  login ({commit, state}, payload) {
    NProgress.start()

    return new Promise(( resolve, reject ) => {
      commit(types.USER_LOGIN, {
        id: 1001,
        username: payload.username,
        email: 'hello@tanibox.com',
        intro: payload.username === 'user' ? false: true
      })
      // implement login http request
      resolve()
    })
  }
}

const mutations = {
  [types.USER_LOGIN] (state, { id, username, email, intro }) {
    state.current = { id, username, email, intro }
  }
}

export default {
  state, getters, actions, mutations
}
