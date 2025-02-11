
export default function () {
   return {
      main_data: {
         data: [],
         ready: false,
         total: 0,
         from: 1,
         loading: false
      },
      order_status: ['ALL', 'BOOKING', 'PENDING', 'PROCESSED', 'COMPLETED', 'CANCELED'],
      order_status_options: ['BOOKING', 'PENDING', 'PROCESSED', 'COMPLETED', 'CANCELED'],
   }
}
