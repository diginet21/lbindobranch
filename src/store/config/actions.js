import { Api } from 'boot/axios'

export function storePaygate({}, payload) {
  return Api().post('paygate-config/' + payload.branch_id, payload)
}

export function getPaygate({}, id) {
  return Api().get('paygate-config/' + id)
}

