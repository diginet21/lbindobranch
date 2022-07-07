
export function SET_EVENT (state, payload) {
  state.events.data = payload.data
  state.events.available = payload.data.length > 0
}

