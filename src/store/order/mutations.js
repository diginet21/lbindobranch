
export function SET_DATA(state, payload) {
   state.main_data = { ...payload.data }
   state.main_data.ready = true
   state.main_data.loading = false
}
export function PAGINATE_DATA(state, payload) {
   state.main_data.data = [...state.main_data.data, ...payload.results]
   state.main_data.skip = payload.skip
   state.main_data.limit = payload.limit
   state.main_data.count = payload.count
   state.main_data.loading = false
}
export function SET_LOADING(state, status) {
   state.main_data.loading = status
}
