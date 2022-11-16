<script setup>
import { computed, onBeforeMount, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Loading } from 'quasar'
import { Api } from 'boot/axios'

import MenuConfig from './MenuConfigTabs.vue'

const store = useStore();
const route = useRoute();

const loading = computed(() => store.state.loading);
const branch = computed(() => store.state.branch);
const cities = computed(() => store.state.cities);

onBeforeMount(() => {
  if (!cities.value.length) {
    store.dispatch("getCities");
  }
  if(!branch.value) {
    Api().get('getMyBranch').then(response => {
      if(response.status == 200) {
        store.commit('SET_BRANCH', response.data.data)
        setData(response.data.data)
      }
    })
  }else {
    setData(branch.value)
  }
});

const cityOptions = computed(() => {
  return cities.value.map((s) => ({
    value: s.id,
    label: s.type + " " + s.city_name,
    ...s,
  }));
});


const title = "Branch Setting";

const form = reactive({
  id: "",
  name: "",
  phone: "",
  email: "",
  address: "",
  warehouse: "",
  latitude: '',
  longitude: '',
  social_media: []
});

const setData = (branch) => {
  form.id = branch.id;
  form.name = branch.name;
  form.phone = branch.phone;
  form.email = branch.email;
  form.address = branch.address;
  form.warehouse = branch.warehouse;
  form.latitude = branch.latitude ?? '';
  form.longitude = branch.longitude ?? '';
  form.social_media = branch.social_media ? branch.social_media.map(el => {
    return {
      type: el.type,
      username: el.username,
      url: el.url
    }
  }) : []

  warehouseString.value =  `${branch.warehouse.subdistrict_name} ${branch.warehouse.type}  ${branch.warehouse.city} - ${branch.warehouse.province}`
};

const submit = () => {
  Loading.show()
  store.dispatch("config/updateBranch", form).then((response) => {
    if(response.status == 200) {
      store.commit('SET_BRANCH', response.data.data)
    }
  }).finally(() => Loading.hide())
};

const filteredKey = ref("");

const filteredCityOptions = computed(() => {
  if (filteredKey.value.length) {
    return cityOptions.value.filter(
      (v) => v.city_name.toLowerCase().indexOf(filteredKey.value) > -1
    );
  } else {
    return cityOptions.value;
  }
});

const filterCity = (val, update, abort) => {
  if (val.length < 2) {
    abort();
    return;
  }
  update(() => {
    filteredKey.value = val.toLowerCase();
  });
};
const search = ref('')
const subdistricts = ref([])
const warehouseString = ref('')

const findSubdistrict = () => {
  if(search.value.length >= 3 ){
    store.dispatch('branch/findSubdistrict', search.value).then(response => {
      subdistricts.value = response.data.results
    })
  }
}
const selectSubdistrict = (item) => {
  form.warehouse = item
  warehouseString.value =  `${item.warehouse.subdistrict_name} ${item.warehouse.type}  ${item.warehouse.city} - ${item.warehouse.province}`
  subdistricts.value = []
  search.value = ''
}

const socmedType = [
  { value: 'whatsapp', label: 'Whatsapp' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'Linkedin' },
]

const handleAddSocmed = () => {

  form.social_media.push({
    type: 'whatsapp',
    username: '',
    url: ''
  })

}

const removeSocmed = (index) => {
  form.social_media.splice(index, 1)
}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">{{ title }}</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard" />
        <q-breadcrumbs-el :label="title" />
      </q-breadcrumbs>
    </div>
     <div class="q-pt-md">
       <MenuConfig />
    </div>
    <q-form @submit.prevent="submit">
      <div>
        <div class="card-box">
          <div class="q-gutter-y-md">
            <q-input filled v-model="form.name" label="Name"></q-input>
            <q-input filled v-model="form.phone" label="Phone"></q-input>
            <div>
              <div class="text-label text-grey-8">Coordinate</div>
              <div class="row q-gutter-x-sm">
                <q-input filled class="col" label="Latitude" v-model="form.latitude"></q-input>
                <q-input filled class="col" label="Longitude" v-model="form.longitude"></q-input>
              </div>
            </div>
            <q-input filled v-model="form.email" label="Email"></q-input>
            <q-input
              filled
              type="textarea"
              v-model="form.address"
              label="Address"
            ></q-input>
            <div>
              <div v-if="form.warehouse" class="">
                <q-input v-model="warehouseString" label="Warehouse" filled readonly>
                  <template v-slot:append v-if="warehouseString">
                    <q-icon name="close" @click="form.warehouse = ''" class="cursor-pointer"></q-icon>
                  </template>
                </q-input>
              </div>
              <div v-else>
                <q-input placeholder="Ketik kecamatan" label="Warehouse" filled :options="subdistricts" use-input v-model="search" @update:model-value="findSubdistrict"></q-input>
                <div class="relative">
                  <div class="absolute bg-white z-50 full-width scroll" style="max-height:200px;">
                    <q-list>
                      <q-item v-for="item in subdistricts" :key="item.id" @click="selectSubdistrict(item)" clickable>
                        <q-item-section>
                          {{ item.subdistrict_name }} {{ item.type }} {{ item.city }} - {{ item.province }}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-box" style="min-height:200px;">
          <div class="flex justify-between items-center q-mb-md">
            <div class="text-md">Social Media</div>
              <q-btn label="Add Socmed" color="primary" size="12px" @click="handleAddSocmed"></q-btn>
          </div>
          <div>
            <q-list>
              <q-item v-for="(item, index) in form.social_media" :key="index" class="q-px-xs">
                <q-item-section style="max-width:200px;">
                  <q-select required filled :options="socmedType" emit-value map-options v-model="form.social_media[index].type" label="Type"></q-select>
                </q-item-section>
                <q-item-section style="max-width:250px;">
                  <q-input required filled v-model="form.social_media[index].username" label="Username / ID"></q-input>
                </q-item-section>
                <q-item-section>
                  <q-input required filled v-model="form.social_media[index].url" label="Link Url"></q-input>
                </q-item-section>
                <q-item-section side>
                  <q-btn icon="delete" round @click="removeSocmed(index)" color="red" unelevated size="sm"></q-btn>
                </q-item-section>
              </q-item>
            </q-list>
            <div class="text-center q-pt-lg" v-if="!form.social_media.length">Tidak ada data</div>
          </div>
        </div>
      </div>
     <div class="q-my-lg">
      <q-btn
        label="Update Data"
        type="submit"
        unelevated
        color="primary"
      ></q-btn>
      </div>
    </q-form>
  </q-page>
</template>
