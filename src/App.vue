<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-icon size="40">mdi-passport</v-icon>
        <div class="text-h4">CheckPassport</div>
      </div>
    </v-app-bar>

    <v-main>
      <v-container class="blue-grey lighten-5 py-16 fill-height">
        <v-row no-gutters justify="center">
          <v-col
            cols="3"
          >
            <v-card 
              tile
              flat
            >
              <v-list class="py-0">
                <div class="d-flex align-center">
                  <v-subheader>Сотрудники</v-subheader>
                  <v-spacer></v-spacer>
                  <v-btn
                    x-small
                    rounded
                    dark
                    color="blue-grey"
                    class="mx-4"
                    @click="addEmp"
                  >
                    <v-icon size="16">mdi-plus</v-icon>
                  </v-btn>
                </div>
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item 
                  v-for="(emp, i) in Object.keys(empStore)"
                  :key="i"
                  @click="showPassport"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ emp }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col
            cols="4"
          >
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
                  v-model="employee.fio"
                ></v-text-field>
                <div class="d-flex align-center">
                  <v-text-field
                    label="Серия"
                    outlined
                    class="flex-grow-0"
                    v-model="employee.pass_ser"
                  ></v-text-field>
                  <v-text-field
                    label="Номер"
                    outlined
                    class="flex-grow-1"
                    v-model="employee.pass_no"
                  ></v-text-field>
                </div>

                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="computedDate"
                      clearable
                      label="Дата выдачи"
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="employee.pass_dt = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="employee.pass_dt"
                    @change="menu = false"
                    :max="curDate"
                  ></v-date-picker>
                </v-menu>

                <v-btn @click="saveEmp">Сохранить</v-btn>
                <v-btn @click="remEmp">Удалить</v-btn>
              </form>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import moment from 'moment'


export default {
  name: 'App',

  components: {

  },

  data: () => ({
    formVisable: false,
    empStore: {},
    employee: {
      fio: "",
      pass_ser: "",
      pass_no: "",
      pass_dt: "",
    },
    curDate: moment().format("YYYY-MM-DD"),
    menu: false,
  }),
  mounted() {
    if (localStorage.getItem("empStore")) {
      this.empStore = JSON.parse(localStorage.getItem("empStore"))
    }

  },
  methods: {
    addEmp() {
      this.formVisable = true
      this.clearEmp()
    },
    saveEmp() {
      this.empStore[this.employee.fio] = JSON.stringify(this.employee)
      this.uploadEmpStore()
    },
    remEmp() {
      delete this.empStore[this.employee.fio]
      this.clearEmp()
      this.uploadEmpStore()
      this.formVisable = false
    },
    showPassport(e) {
      let tmp = this.empStore[e.target.innerText]
      this.employee = JSON.parse(tmp)
      console.log(this.empStore[e.target.innerText])
      this.formVisable = true
    },
    clearEmp() {
      this.employee.fio = ""
      this.employee.pass_ser = ""
      this.employee.pass_no = ""
      this.employee.pass_dt = ""
    },
    uploadEmpStore() {
      const parsed = JSON.stringify(this.empStore)
      localStorage.setItem("empStore", parsed)
    }
  },
  computed: {
      computedDate() {
        return this.employee.pass_dt ? moment(this.employee.pass_dt).format("YYYY-MM-DD") : ""
      },
    },
};
</script>
