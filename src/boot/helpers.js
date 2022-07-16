import { boot } from 'quasar/wrappers'

import MoneyFormatter from 'components/MoneyFormatter.vue'

const money = (numb) => {
  return 'Rp '+ numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default boot(({ app, store }) => {
  app.component('money-formatter', MoneyFormatter)
  app.config.globalProperties.$money = money
})