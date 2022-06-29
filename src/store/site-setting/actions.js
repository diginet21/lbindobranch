import { Api } from 'boot/axios'

export function getSites (context) {
  return Api().get('sites-setting')
}
export function getData (context) {
   Api().get('sites-setting').then((response) => {
    if(response.status == 200) {
      context.commit('SET_SETTING', response.data.results)
    }
   })
}
export function update (context, payload) {
  return Api().post('/sites-setting', formatData(payload), { headers: { 'Content-Type': 'multipart/formdata' }})
}

function formatData(form) {
  const formData = new FormData()
  for( let x in form) {
    if(form[x]) {
      formData.append(x, form[x])
    }
  }

  return formData;
}


