export function getMasterOptions (state) {
  return state.master_data.map(e => ({ value: e.id, label: e.title + ' ' + money(e.price) }))

}
function money (numb) {
  return 'Rp '+ numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}