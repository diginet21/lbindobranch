
export function SET_POSTS (state, payload) {

  state.posts.data = payload.data
  state.posts.available = payload.data.length > 0
  state.posts.ready = true
  
}
export function SET_POST_CATEGORIES (state, payload) {

  state.post_categories = payload.data
  
}

