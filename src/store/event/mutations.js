
export function SET_EVENT(state, payload) {
   state.events = { ...payload.data }
   state.events.ready = true
}

