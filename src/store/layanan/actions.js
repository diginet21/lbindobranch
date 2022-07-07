import { Api } from 'boot/axios'

export function store ({dispatch, commit}, payload) {
  commit('SET_LOADING', true, { root: true })
  payload._method = 'POST'
  Api().post('/layanan', payload)
  .then(() => {
    dispatch('getIndex')
    dispatch('getMaster')
    this.$router.push({name: 'LayananIndex'})
  })
  .finally(() => {
    commit('SET_LOADING', false, { root: true })
  })
}
export function update ({dispatch, commit}, payload) {
  commit('SET_LOADING', true, { root: true })
  payload._method = 'PUT'
  Api().post('/layanan/' + payload.id, payload)
  .then(() => {
    dispatch('getIndex')
    dispatch('getMaster')
    this.$router.push({name: 'LayananIndex'})
  })
  .finally(() => {
    commit('SET_LOADING', false, { root: true })
  })
}
export function getIndex ({commit}) {
   Api().get('/layanan').then(response => {
     if(response.status == 200) {
       commit('SET_DATA', response.data.data)
     }
   })
}
export function getMaster ({commit}) {
  Api().get('/layanan-all').then(response => {
    if(response.status == 200) {
      commit('SET_DATA_MASTER', response.data.data)
    }
  })
}
export function paginateData ({ commit }, payload) {
  commit('SET_LOADING', true, { root: true })
  Api().get('/layanan?skip='+ payload.skip + '&take=' + payload.take).then(response => {
    if(response.status == 200) {
      commit('PAGINATE_DATA', response.data.data)
    }
  }).finally(() => commit('SET_LOADING', false, { root: true }))
}
export function getById ({}, id) {
   return Api().get('/layanan/' +id)
}
export function destroy ({dispatch}, id) {
   Api().delete('/layanan/' + id)
   .finally(() => {
    dispatch('getIndex')
    dispatch('getMaster')
   })
}

