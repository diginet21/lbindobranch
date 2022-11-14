import { Api } from 'boot/axios'
import { Notify } from 'quasar'

export function store ({dispatch, commit}, payload) {
  commit('SET_LOADING', true, { root: true })
  Api().post('/vehicles', payload)
  .then((response) => {
    if(response.status == 200) {
      dispatch('getIndex')
      dispatch('getAll')
      this.$router.push({name: 'Vehicles'})
    }
  })
  .finally(() => commit('SET_LOADING', false, { root: true }))
  .catch((err) => {
    Notify.create({
      type: 'negative',
      message: err.response.data.error
    })
  })
}
export function update ({dispatch, commit}, payload) {
  console.log(payload);
  commit('SET_LOADING', true, { root: true })
  Api().post('/vehicles/' + payload.id, payload)
  .then((response) => {
    if(response.status == 200) {
      dispatch('getIndex')
      this.$router.push({name: 'Vehicles'})
    }else {
      alert('yayayaya')
    }
  })
  .finally(() => commit('SET_LOADING', false, { root: true }))
  .catch((err) => {
    Notify.create({
      type: 'negative',
      message: err.response.data.error
    })
  })
}
export function getIndex ({commit}) {
   Api().get('/vehicles').then(response => {
     if(response.status == 200) {
       commit('SET_DATA', response.data.data)
     }
   })
}
export function paginateData ({ commit }, payload) {
  commit('SET_LOADING', true, { root: true })
  Api().get('/vehicles?skip='+ payload.skip + '&take=' + payload.take).then(response => {
    if(response.status == 200) {
      commit('PAGINATE_DATA', response.data.data)
    }
  }).finally(() => commit('SET_LOADING', false, { root: true }))
}
export function getAll ({commit}) {
   Api().get('/vehicle-all').then(response => {
     if(response.status == 200) {
       commit('SET_DATA_MASTER', response.data.data)
     }
   })
}
export function getById ({}, id) {
   return Api().get('/vehicles/' + id)
}
export function destroy ({dispatch}, id) {
   Api().delete('/vehicles/' + id).finally(() => {
    dispatch('getIndex')
    dispatch('getAll')
   })
}
