import { Api } from 'boot/axios'

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
export function filterData ({ commit }, payload) {
  let url = 'orders'

  url += `?${setParams(payload)}`

  Api().get(url).then(response => {
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