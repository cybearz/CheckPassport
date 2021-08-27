<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="computedDate"
        @input="changeDate"
        clearable
        label="Дата выдачи"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="pass_dt"
      @input="changeDate"
      @change="menu = false"
      :max="curDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    pass_dt: {
      type: String,
      required: true
    }
  },
  data: ()=> ({
    curDate: moment().format("YYYY-MM-DD"),
    menu: false
  }),
  methods: {
    changeDate(e) {
      console.log(e)
      this.$emit('input', e)
      
    }
  },
  computed: {
    computedDate() {
      return this.pass_dt ? moment(this.pass_dt).format("YYYY-MM-DD") : ""
    },
  },
}
</script>

<style>

</style>