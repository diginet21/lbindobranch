import { Api } from 'boot/axios'

export function store ({}, payload) {
  return Api().post('leads', payload)
}
export function update ({ dispatch }, payload) {
  payload._method = 'PUT'
  return Api().post('leads/' + payload.id, payload)
}
export function updateStatus ({}, payload) {
  return Api().post('lead/updateStatus', payload)
}
export function getAll ({commit}) {
   Api().get('leads').then(response => {
     if(response.status == 200) {
       commit('SET_DATA', response.data.data)
     }
   })
}
export function paginateData ({ commit }, payload) {
  commit('SET_LOADING', true, { root: true })
  Api().get('/leads?skip='+ payload.skip + '&take=' + payload.take).then(response => {
    if(response.status == 200) {
      commit('PAGINATE_DATA', response.data.data)
    }
  }).finally(() => commit('SET_LOADING', false, { root: true }))
}
export function getStatus ({commit}) {
   Api().get('lead-status').then(response => {
     if(response.status == 200) {
       commit('SET_LEAD_STATUS', response.data.results)
     }
   })
}
export function getNewLeadCount ({commit}) {
   Api().get('getNewLeadCount').then(response => {
     if(response.status == 200) {
       commit('SET_NEW_LEAD_COUNT', response.data.results)
     }
   })
}
export function getById ({}, id) {
   return Api().get('leads/' +id)
}
export function destroy ({dispatch}, id) {
   Api().delete('leads/' + id).finally(() => dispatch('getAll'))
}

