<template>
  <v-card 
    elevation="4"
    tile
    v-if="formVisible"
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
        @input="saveBtnVisible = true, $emit('input', 'fio', $event)"
      ></v-text-field>
      <div class="d-flex align-center">
        <v-text-field
          label="Серия"
          outlined
          class="flex-grow-0"
          :value="employee.pass_ser"
          @input="$emit('input', 'pass_ser', $event)"
        ></v-text-field>
        <v-text-field
          label="Номер"
          outlined
          class="flex-grow-1"
          :value="employee.pass_no"
          @input="$emit('input', 'pass_no', $event)"
        ></v-text-field>
      </div>
        <calendar 
          :pass_dt="employee.pass_dt"
          @input="$emit('input', 'pass_dt', $event)"
        />
      <v-btn 
        v-if="saveBtnVisible"
        @click="saveBtnVisible = false, $emit('saveEmp')"
      >Сохранить</v-btn>
      <v-btn @click="$emit('removeEmp')">Удалить</v-btn>
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
    formVisible: {
      type: Boolean,
      required: true
    },
    employee: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    saveBtnVisible: false
  }),
}
</script>

<style>

</style>