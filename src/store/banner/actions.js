import { Api } from 'boot/axios'

export function getBanners ({ commit }) {
  Api().get('/banners').then(response => {
    if(response.status == 200) {
      commit('SET_BANNER', response.data)
    }
  })
}
export function getBannerById ({ commit }, id) {
  return Api().get('/banners/' + id)
}

export function storeBanner ({ dispatch, commit }, payload) {

  payload._method = 'POST'
  commit('SET_LOADING', true, { root: true })
  Api().post('/banners', formatData(payload), { headers: { 'Content-Type': 'multipart/form-data'} }).then(() => {
    dispatch('getBanners')
    this.$router.push({name: 'BannerIndex'})
  }).finally(() => commit('SET_LOADING', false, { root: true }))
}

export function updateBanner ({ dispatch, commit }, payload) {
  commit('SET_LOADING', true, { root: true })
  payload._method = 'PUT'
  Api().post('/banners/' + payload.id, formatData(payload),  { headers: { 'Content-Type': 'multipart/form-data'} }).then(() => {
    dispatch('getBanners')
    this.$router.push({name: 'BannerIndex'})
  }).finally(() => commit('SET_LOADING', false, { root: true }))
}
export function destroy ({ dispatch, commit }, id) {
  commit('SET_LOADING', true, { root: true })
  Api().delete('/banners/' +id).then(() => {
    dispatch('getBanners')
  }).finally(() => commit('SET_LOADING', false, { root: true }))
}

function formatData(payload) {

  let formData = new FormData()

  for(const key in payload) {

    if(payload[key]) {

      formData.append(key, payload[key])

    }
    
  }
  return formData;
}
