import { Api } from 'boot/axios'

export function getOrders ({ commit }) {
  Api().get('/orders').then(response => {
    if(response.status == 200) {
      commit('SET_ORDERS', response.data.results)
    }
  })
}
export function getById ({ commit }, id) {
  return Api().get('/orders/' +id)
}