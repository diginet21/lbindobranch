import { Api } from 'boot/axios'

export function getParts ({commit}) {
  Api().get('/parts').then(response => {
    if(response.status == 200) {
      commit('SET_PARTS', response.data)
    }
  })
}
export function getAll ({commit}) {
  Api().get('/part-all').then(response => {
    if(response.status == 200) {
      commit('SET_PARTS_ALL', response.data)
    }
  })
}
export function getPartCategories ({commit}) {
  Api().get('/part-categories').then(response => {
    if(response.status == 200) {
      commit('SET_PART_CATEGORIES', response.data)
    }
  })
}
export function partStore ({dispatch,commit}, payload) {

  // console.log(Object.fromEntries(formatData(payload)));
  commit('SET_LOADING', true, { root: true })
  payload._method = 'POST'
  Api().post('/parts', payload)
  .then(() => {
    dispatch('getParts')
    this.$router.push({name: 'PartIndex'})
  })
  .finally(() => commit('SET_LOADING', false, { root: true }))
}
export function partUpdate ({dispatch, commit}, payload) {
  commit('SET_LOADING', true, { root: true })
  payload._method = 'PUT'
  Api().post('/parts/'+payload.id, payload)
  .then(() => {
    dispatch('getParts')
    this.$router.push({name: 'PartIndex'})
  })
  .finally(() => commit('SET_LOADING', false, { root: true }))
}

export function getPartById({}, id) {
  return Api().get('/parts/' + id)
}

function formatData(payload) {

  let formData = new FormData()

  for(const key in payload) {

    if(payload[key] && key != 'images' && key != 'delete_images') {

      formData.append(key, payload[key])
    }

  }

  if(payload.images.length) {
    for(let i = 0; i < payload.images.length; i++) {
      formData.append(`images[${i}]`, payload.images[i])
    }
  }

  if(payload.delete_images && payload.delete_images.length) {
    for(let j = 0; j < payload.delete_images.length; j++) {
      formData.append(`delete_images[${j}]`, payload.delete_images[j])
    }
  }

  return formData;
}