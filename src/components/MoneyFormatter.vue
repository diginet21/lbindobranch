<template>
  <div>
    <q-input 
    v-model="price" 
    :outlined="outlined" 
    :filled="filled" 
    :label="label" 
    @update:model-value="updateData" 
    :required="required"
    prefix="Rp"></q-input>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Price'
    },
    filled: Boolean,
    outlined: Boolean,
    required: Boolean,
    modelValue: [String, Number],
  },
  emits: ['update:modelValue'],
  data () {
    return {
      price: this.money(this.modelValue)
    }
  },
  watch: {
    modelValue(val) {
      if(val) {
        this.price = this.money(val)
      }
    }
  },
  methods: {
    updateData(val) {
      this.price = this.money(this.cleaning(val))
      this.$emit('update:modelValue', this.price)
    },
    money(numb) {
      return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    cleaning(val) {
      return val.replace(/\D/g, '')
    }
  }
}
</script>