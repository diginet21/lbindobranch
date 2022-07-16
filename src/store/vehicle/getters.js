
export function getAllOptions (state) {
  let opts = state.vehicle_master.map(e => ({ value: e.id, label: e.title + ' ' + money(e.price) }))

  return opts
}

function money (numb) {
  return 'Rp '+ numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}