import Cookie from 'js-cookie'

export function SET_LOGIN (state, payload) {
  state.account = payload.user,
  state.isLogin = true,
  state.token = payload.token
  Cookie.set('__token', payload.token)
}
export function SET_USER (state, payload) {
  state.account = payload.user
}
export function SET_USERS (state, payload) {
  state.users = payload
}

export function LOGOUT(state) {
  state.account = null,
  state.isLogin = false,
  state.token = null,
  Cookie.remove('__token')
}
