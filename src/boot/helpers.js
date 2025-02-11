import { boot } from 'quasar/wrappers'

import MoneyFormatter from 'components/MoneyFormatter.vue'
import SimplePagination from 'components/SimplePagination.vue'

const money = (numb) => {
   return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const moneyIdr = (numb) => {
   return 'Rp ' + numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default boot(({ app, store }) => {
   app.component('money-formatter', MoneyFormatter)
   app.component('SimplePagination', SimplePagination)
   app.config.globalProperties.$money = money
   app.config.globalProperties.$moneyIdr = moneyIdr
})