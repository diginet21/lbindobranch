
export function getCategoryOptions (state) {

    let opts = { value: '', label: 'Select'}
    opts = [ opts, ...state.post_categories.map(s => ({ value: s.id, label: s.title }))]
  
    return opts

}
