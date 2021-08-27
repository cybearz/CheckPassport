<template>
  <v-card 
    elevation="4"
    tile
    v-if="formVisable"
  >
  <v-subheader>Паспортные данные</v-subheader>
    <form
      class="pa-3"
    >
      <v-text-field
        label="ФИО"
        outlined
        clearable
        filled
        :value="employee.fio"
        @input="saveBtnVisable = true, $emit('inputFio', $event)"
      ></v-text-field>
      <div class="d-flex align-center">
        <v-text-field
          label="Серия"
          outlined
          class="flex-grow-0"
          :value="employee.pass_ser"
          @input="$emit('inputPass_ser', $event)"
        ></v-text-field>
        <v-text-field
          label="Номер"
          outlined
          class="flex-grow-1"
          :value="employee.pass_no"
          @input="$emit('inputPass_no', $event)"
        ></v-text-field>
      </div>
        <calendar 
          :pass_dt="employee.pass_dt"
          @input="$emit('inputPass_dt', $event)"
        />
      <v-btn 
        v-if="saveBtnVisable"
        @click="saveBtnVisable = false, $emit('saveEmp')"
      >Сохранить</v-btn>
      <v-btn @click="$emit('remEmp')">Удалить</v-btn>
    </form>
  </v-card>
</template>

<script>
import calendar from "@/components/calendar"

export default {
  components: {
    calendar,
  },
  props: {
    formVisable: {
      type: Boolean,
      required: true
    },
    employee: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    saveBtnVisable: false
  })
}
</script>

<style>

</style>