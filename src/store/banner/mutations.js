
export function SET_BANNER (state, payload) {
  state.banners.data = payload.data
  state.banners.available = payload.data.length > 0
  state.main_data.ready = true
}

