<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    max-width="290"
  >
    <template #activator="{ on }">
      <v-text-field
        :value="rusDate"
        :rules="rules"
        @input="changeDate"
        outlined
        readonly
        label="Дата выдачи"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="computedDate"
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
    rules: {
      required: true
    },
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
      this.$emit('input', e)     
    }
  },
  computed: {
    rusDate() {
      return this.pass_dt ? moment(this.pass_dt).format("DD-MM-YYYY") : ""
    },
    computedDate() {
      return this.pass_dt ? moment(this.pass_dt).format("YYYY-MM-DD") : ""
    }
  },
}
</script>

<style>

</style>