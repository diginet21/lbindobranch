export default function () {
  return {
    main_data: {
      data: [],
      count: 0,
      limit: 0,
      skip: 0,
      available: true,
      ready: false,
      total: 0,
      loading: false
    },
    order_status: ['ALL', 'BOOKING','PENDING', 'PROCESSED', 'COMPLETED', 'CANCELED'],
    order_status_options: ['BOOKING','PENDING', 'PROCESSED', 'COMPLETED', 'CANCELED'],
  }
}
