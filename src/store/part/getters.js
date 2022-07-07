
export function getPartCategoryOptions (state) {
  let opts = state.part_categories.map(e => ({ value: e.id, label: e.title }))

  return opts
}
export function getAllPartOptions (state) {
  return state.parts_master.map(e => ({ value: e.id, label: e.title + ' ' + money(e.pricing.sell_price) }))

}

function money (numb) {
  return 'Rp '+ numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}