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
            <empList
              :emps="empKeys"
              @addEmp="addEmp"
              @showPassport="showPassport($event)"
            />
          </v-col>
          <v-col
            cols="4"
          >
            <passportForm 
              :formVisible="formVisible" 
              :employee="employee"
              @input="inpChange"
              @saveEmp="saveEmp"
              @removeEmp="removeEmp"
            />
          </v-col>
        </v-row>

      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import _ from 'lodash'

import passportForm from "@/components/passportForm"
import empList from "@/components/empList"

export default {
  name: 'App',
  components: {
    passportForm, empList
  },
  data: () => ({
    formVisible: false,
    empKeys: [],
    empStore: {},
    employee: {
      fio: "",
      pass_ser: "",
      pass_no: "",
      pass_dt: "",
    },
  }),
  mounted() {
    if (localStorage.getItem("empStore")) {
      this.empStore = JSON.parse(localStorage.getItem("empStore"))
      this.empKeys = _.keys(this.empStore)
    }

  },
  methods: {
    addEmp() {
      this.formVisible = true
      this.clearEmp()
    },
    inpChange(key, txt) {
      this.employee[key] = txt
    },
    saveEmp() {
      _.forIn(this.employee, (value, key) => {
        this.employee[key] = _.trim(value)
      })
      this.empStore[this.employee.fio] = this.employee
      this.empKeys.push(this.employee.fio)
      this.uploadEmpStore()
    },
    removeEmp() {
      const fio = this.employee.fio
      if (this.empStore[fio]) {
        delete this.empStore[fio]
        // _.remove(this.empKeys, el =>  el == fio)
        const ind = this.empKeys.findIndex(el => el === fio)
        this.empKeys.splice(ind, 1)
      }
      this.clearEmp()
      this.uploadEmpStore()
      this.formVisible = false
    },
    showPassport(key) {
      this.employee = this.empStore[key]
      this.formVisible = true
    },
    clearEmp() {
      this.employee = {
        fio: "",
        pass_ser: "",
        pass_no: "",
        pass_dt: "",
      }
    },
    uploadEmpStore() {
      const parsed = JSON.stringify(this.empStore)
      localStorage.setItem("empStore", parsed)
    },
  },
};
</script>
