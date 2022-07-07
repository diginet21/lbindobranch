import { Api } from 'boot/axios'

export function getOrders ({ commit }) {
  Api().get('/orders').then(response => {
    if(response.status == 200) {
      commit('SET_DATA', response.data.data)
    }
  })
}
export function paginateData ({ commit }, payload) {
  commit('SET_LOADING', true, { root: true })
  Api().get('/orders?skip='+ payload.skip + '&take=' + payload.take).then(response => {
    if(response.status == 200) {
      commit('PAGINATE_DATA', response.data.data)
    }
  }).finally(() => commit('SET_LOADING', false, { root: true }))
}
export function getById ({ commit }, id) {
  return Api().get('/orders/' +id)
}