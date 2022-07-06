import { boot } from 'quasar/wrappers'

const money = (numb) => {
  return 'Rp '+ numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default boot(({ app, store }) => {
  app.config.globalProperties.$money = money
})