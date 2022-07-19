import { BaseApi, Api } from 'boot/axios'
import { Notify } from 'quasar'

export function login({commit, dispatch}, payload) {
  commit('SET_LOADING', true, { root: true})
  BaseApi().post('auth/login', payload)
  .then(response => {
    if(response.status == 200) {
      commit('SET_LOGIN', response.data.results)
      commit('SET_BRANCH', response.data.results.branch, { root: true })
      // dispatch('getCurrentBranch', null, { root: true })
      this.$router.push({name: 'Dashboard'})
    }
  })
  .finally(() =>  commit('SET_LOADING', false, { root: true}))

}
export function register({commit}, payload) {
  commit('SET_LOADING', true, { root: true})
  BaseApi().post('auth/register', payload)
  .then(response => {
    if(response.status == 201) {
      commit('SET_LOGIN', response.data.results)
      this.$router.push({name: 'Dashboard'})
    }
  })
  .finally(() =>  commit('SET_LOADING', false, { root: true}))
}
export function update({commit}, payload) {
  commit('SET_LOADING', true, { root: true})
  BaseApi().post('auth/update', payload)
  .then(response => {
    if(response.status == 200) {
      Notify.create({
        type: 'positive',
        message: 'Behasil memperbarui data'
      })
      commit('SET_USER', response.data.results)
    }
  })
  .finally(() =>  commit('SET_LOADING', false, { root: true}))
}

export function requestPassword({commit}, payload) {
  return BaseApi().post('auth/request-password', payload)
}

export function logout({commit}) {
  BaseApi().post('auth/logout').finally(() => {
    commit('LOGOUT')
    this.$router.push({name: 'Login'})
  })
}
export function exit({commit}) {
  commit('LOGOUT')
  this.$router.push({name: 'Login'})
}
export function getById({}, id) {
  return Api().get('getUserById/'+ id)
}
export function getAll({commit}) {
  commit('SET_LOADING', true, { root: true})
  Api().get('users')
  .then(response => {
    if(response.status == 200) {
      commit('SET_USERS', response.data.results)
    }
  })
  .finally(() =>  commit('SET_LOADING', false, { root: true}))
}
export function addUserAdmin({dispatch, commit}, payload) {
  commit('SET_LOADING', true, { root: true})
  Api().post('addUserAdmin', payload)
  .then(response => {
    if(response.status == 200) {
      this.$router.push({name: 'UserAdminIndex'})
    }
  })
  .finally(() =>  commit('SET_LOADING', false, { root: true}))
}
export function updateUserAdmin({commit}, payload) {
  commit('SET_LOADING', true, { root: true})
  BaseApi().post('auth/update', payload)
  .then(response => {
    if(response.status == 200) {
      this.$router.push({name: 'UserAdminIndex'})
    }
  })
  .finally(() =>  commit('SET_LOADING', false, { root: true}))
}