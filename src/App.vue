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
            <EmpList
              :emps="empKeys"
              @addEmp="addEmp"
              @showPassport="showPassport($event)"
            />
          </v-col>
          <v-col
            cols="4"
          >
            <PassportForm 
              :formVisible="formVisible"
              :saveBtnVisible="saveBtnVisible" 
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

import PassportForm from "@/components/PassportForm"
import EmpList from "@/components/EmpList"

export default {
  name: 'App',
  components: {
    PassportForm, EmpList
  },
  data: () => ({
    formVisible: false,
    saveBtnVisible: false,
    currEmpStoreKey: "",
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
      this.currEmpStoreKey = ""
      this.clearEmp()
    },
    inpChange(key, txt) {
      this.employee[key] = txt
      const tmp = this.empStore[this.currEmpStoreKey]
      if (_.isEqual(this.employee, tmp)) {
        this.saveBtnVisible = false
      } else {
        this.saveBtnVisible = true
      }
      
    },
    saveEmp() {
      let [Surname, N, MN] = this.employee.fio.split(" ")
      const empStoreKey = `${Surname} ${N[0].toUpperCase()}. ${MN[0].toUpperCase()}.`

      if (this.currEmpStoreKey && this.currEmpStoreKey !== empStoreKey) {
        this.removeEmp()
      }
      if (!this.currEmpStoreKey) {
        this.currEmpStoreKey = empStoreKey
        this.empKeys.push(empStoreKey)
      }  
      this.empStore[this.currEmpStoreKey] = _.assign({}, this.employee) 
      this.saveBtnVisible = false
      this.uploadEmpStore()
    },
    removeEmp() {
      const fio = this.currEmpStoreKey
      
      if (this.empStore[fio]) {
        delete this.empStore[fio]
        // _.remove(this.empKeys, el =>  el == fio)
        const ind = this.empKeys.findIndex(el => el === fio)
        this.empKeys.splice(ind, 1)
        this.currEmpStoreKey = ""
      }

      this.uploadEmpStore()
      this.formVisible = false
    },
    showPassport(key) {
      this.currEmpStoreKey = key
      _.assign(this.employee, this.empStore[key])
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
