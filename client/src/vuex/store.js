import Vue from 'vue'
import Vuex from 'vuex'
import { Api } from '@/Api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {
    register({ commit }, credentials) {
      return Api
        .post('/users/register', credentials, { withCredentials: true })
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    login({ commit }, credentials) {
      return Api
        .post('/users/login', credentials, { withCredentials: true })
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout({ commit }) {
      return Api
        .post('/users/logout', { withCredentials: true })
        .then(({ data }) => {
          commit('CLEAR_USER_DATA')
        })
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  }
})
