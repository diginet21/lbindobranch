import { Api } from 'boot/axios'

export function getAllEvent({ commit }, url = null) {
   if (!url) {
      url = '/events'
   }
   Api().get(url).then(response => {
      if (response.status == 200) {
         commit('SET_EVENT', response.data)
      }
   })
}
export function getEventById({ commit }, id) {
   return Api().get('/events/' + id)
}

export function storeEvent({ dispatch, commit }, payload) {
   commit('SET_LOADING', true, { root: true })
   payload._method = 'POST'

   Api().post('/events', formatData(payload), { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
         dispatch('getAllEvent')
         this.$router.push({ name: 'EventIndex' })
      })
      .finally(() => commit('SET_LOADING', false, { root: true }))
}

export function updateEvent({ dispatch, commit }, payload) {
   commit('SET_LOADING', true, { root: true })
   payload._method = 'PUT'
   Api().post('/events/' + payload.id, formatData(payload), { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
         dispatch('getAllEvent')
         this.$router.push({ name: 'EventIndex' })
      })
      .finally(() => commit('SET_LOADING', false, { root: true }))
}
export function destroy({ dispatch }, id) {

   Api().delete('/events/' + id).then(() => {
      dispatch('getAllEvent')
   })
}

function formatData(payload) {

   let formData = new FormData()

   for (const key in payload) {

      if (payload[key]) {

         formData.append(key, payload[key])

      }

   }
   return formData;
}
