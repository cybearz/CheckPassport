<template>
  <v-card 
    elevation="4"
    tile
    v-if="formVisible"
  >
  <v-subheader>Паспортные данные</v-subheader>
    <v-form
      ref="form"
      class="pa-3"
    >
      <v-text-field
        label="ФИО"
        outlined
        :value="employee.fio"
        :rules="nameRules"
        @input="$emit('input', 'fio', $event)"
      ></v-text-field>
      <div class="d-flex align-center">
        <v-text-field
          label="Серия"
          outlined
          class="flex-grow-0"
          :value="employee.pass_ser"
          :rules="serRules"
          @input="$emit('input', 'pass_ser', $event)"
        ></v-text-field>
        <v-text-field
          label="Номер"
          outlined
          class="flex-grow-1"
          :value="employee.pass_no"
          :rules="nomRules"
          @input="$emit('input', 'pass_no', $event)"
        ></v-text-field>
      </div>
        <Calendar 
          :pass_dt="employee.pass_dt"
          :rules="dtRules"
          @input="$emit('input', 'pass_dt', $event)"
        />
      <v-btn 
        v-if="saveBtnVisible"
        @click="saveEmp"
      >Сохранить</v-btn>
      <v-btn @click="$emit('removeEmp')">Удалить</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import Calendar from "@/components/Calendar"

export default {
  components: {
    Calendar,
  },
  props: {
    formVisible: {
      type: Boolean,
      required: true
    },
    saveBtnVisible: {
      type: Boolean,
      required: true
    },
    employee: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    nameRules: [
      v => !!v || "Введите имя",
      v => /^([a-zA-Zа-яА-ЯёЁ]{2,} [a-zA-Zа-яА-ЯёЁ]{2,} [a-zA-Zа-яА-ЯёЁ]{2,})+$/.test(v) || "Пример: Иванов Иван Иванович."
    ],
    serRules: [
      v => !!v || "Введите серию",
      v => /^(\d{4})+$/.test(v) || "Пример: 1210."
    ],
    nomRules: [
      v => !!v || "Введите номер",
      v => /^(\d{6})+$/.test(v) || "Пример: 111111."
    ],
    dtRules: [
      v => !!v || "Введите дату"
    ]
  }),
  methods: {
    saveEmp() {
      if (this.$refs.form.validate()) {
        this.$emit('saveEmp')
      }
    }
  }
}
</script>

<style>

</style>