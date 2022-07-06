import { Api } from 'boot/axios'

export function store ({dispatch, commit}, payload) {
  commit('SET_LOADING', true, { root: true })
  Api().post('/vehicles', payload)
  .then((response) => {
    if(response.status == 200) {
      dispatch('getIndex')
      this.$router.push({name: 'Vehicles'})
    }
  })
  .finally(() => commit('SET_LOADING', false, { root: true }))
}
export function update ({dispatch, commit}, payload) {
  console.log(payload);
  commit('SET_LOADING', true, { root: true })
  Api().post('/vehicles/' + payload.id, payload)
  .then((response) => {
    if(response.status == 200) {
      dispatch('getIndex')
      this.$router.push({name: 'Vehicles'})
    }
  })
  .finally(() => commit('SET_LOADING', false, { root: true }))
}
export function getIndex ({commit}) {
   Api().get('/vehicles').then(response => {
     if(response.status == 200) {
       commit('SET_VEHICLES', response.data.data)
     }
   })
}
export function getAll ({commit}) {
   Api().get('/vehicle-all').then(response => {
     if(response.status == 200) {
       commit('SET_VEHICLES_MASTER', response.data.data)
     }
   })
}
export function getById ({}, id) {
   return Api().get('/vehicles/' + id)
}
export function destroy ({dispatch}, id) {
   Api().delete('/vehicles/' + id).finally(() => dispatch('getIndex'))
}
