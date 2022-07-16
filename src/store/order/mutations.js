
export function SET_DATA (state, payload) {
  state.main_data.data = payload.results
  state.main_data.skip = payload.skip
  state.main_data.limit = payload.limit
  state.main_data.count = payload.count
  state.main_data.available = payload.count > 0
  state.main_data.ready = true
}
export function PAGINATE_DATA (state, payload) {
  state.main_data.data = [...state.main_data.data, ...payload.results]
  state.main_data.skip = payload.skip
  state.main_data.limit = payload.limit
  state.main_data.count = payload.count
}
