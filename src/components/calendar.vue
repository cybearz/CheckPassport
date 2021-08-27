<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="pass_dt"
        clearable
        label="Дата выдачи"
        v-bind="attrs"
        v-on="on"
        @click:clear="date = null"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
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
    date: "",
    curDate: moment().format("YYYY-MM-DD"),
    menu: false
  }),
  methods: {
    changeDate() {
      this.$emit("changeDate", this.date)
      
    }
  },
  computed: {
    computedDate() {
      return this.date ? moment(this.date).format("YYYY-MM-DD") : ""
    },
  },
  watch: {
    date() {
      this.changeDate()
    }
  }
}
</script>

<style>

</style>