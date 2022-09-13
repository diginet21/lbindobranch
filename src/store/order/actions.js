import { Api } from 'boot/axios'
import { Loading, Notify } from 'quasar'

export function getOrders ({ commit }, payload = null) {
  
  let url = 'orders'

  if(payload) {
    let params = setParams(payload)
    url += `?${params}`
  }
  Api().get(url).then(response => {
    if(response.status == 200) {
      commit('SET_DATA', response.data.data)
    }
  })
  
}
export function update({dispatch}, payload) {
  Loading.show()
  Api().post('orders/' + payload.id, payload).then(() => {
    dispatch('getOrders')
    Notify.create({
      type: 'positive',
      message: 'Order has been successfully updated',
      position: 'top-right'
    })
  }).finally(() => Loading.hide())
}
export function process({dispatch}, id) {
 return Api().post('processOrder/' + id)
}
export function inputResi({dispatch}, payload) {
  return Api().post('inputResi', payload)
}
export function filterData ({ commit }, payload) {
  commit('SET_LOADING', true, { root: true })
  let url = 'orders'

  url += `?${setParams(payload)}`

  Api().get(url).then(response => {
    if(response.status == 200) {
      commit('SET_DATA', response.data.data)
    }
  })
  .finally(() =>  commit('SET_LOADING', false, { root: true }))
}
export function paginateData ({ commit }, payload) {
  commit('SET_LOADING', true)
  let url = 'orders?'

  url += setParams(payload)

  Api().get(url).then(response => {
    if(response.status == 200) {
      commit('PAGINATE_DATA', response.data.data)
    }
  }).finally(() => commit('SET_LOADING', false))
}
export function getById ({ commit }, id) {
  return Api().get('/orders/' +id)
}

function setParams(payload) {
  let data = {};
  for(const k in payload) {
    if(payload[k]) {
      data[k] = payload[k]
    }
  }
  let params = new URLSearchParams(data).toString();

  return params
}