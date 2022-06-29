import { Api } from 'boot/axios'

export function getPosts ({ commit }) {
  Api().get('/posts').then(response => {
    if(response.status == 200) {
      commit('SET_POSTS', response.data)
    }
  })
}
export function getById ({ }, id) {
  return Api().get('/posts/' + id)
}

export function postStore ({ dispatch, commit }, payload) {
  commit('SET_LOADING', true, { root: true })
  payload._method = 'POST'

  Api().post('/posts', formatData(payload), { headers: { 'Content-Type': 'multipart/form-data'} }).then(() => {
    dispatch('getPosts')
    this.$router.push({name: 'PostIndex'})
  })
  .finally(() => commit('SET_LOADING', false, { root: true }))
}

export function postUpdate ({ dispatch, commit }, payload) {
  commit('SET_LOADING', true, { root: true })
  Api().post('/posts/' + payload.id, formatData(payload),  { headers: { 'Content-Type': 'multipart/form-data'} })
  .then(() => {
    dispatch('getPosts')
    this.$router.push({name: 'PostIndex'})
  })
  .finally(() => commit('SET_LOADING', false, { root: true }))
}
export function destroy ({ dispatch }, id) {

  Api().delete('/posts/' +id).then(() => {
    dispatch('getPosts')
  })
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
