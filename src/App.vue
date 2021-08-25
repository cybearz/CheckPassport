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
                  >
                    <v-icon size="16">mdi-plus</v-icon>
                  </v-btn>
                </div>
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item 
                  v-for="(emp, i) in employees"
                  :key="i"
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
            >
            <v-subheader>Паспортные данные</v-subheader>
              <form
                class="pa-3"
              >
                <v-text-field
                  label="ФИО"
                  outlined
                  dense
                  clearable
                  filled
                ></v-text-field>
                <div class="d-flex align-center">
                  <v-text-field
                    label="Серия"
                    outlined
                    class="flex-grow-0"
                  ></v-text-field>
                  <v-text-field
                    label="Номер"
                    outlined
                    class="flex-grow-1"
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
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @change="menu = false"
                  ></v-date-picker>
                </v-menu>

                <v-btn>Сохранить</v-btn>
                <v-btn>Удалить</v-btn>
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
    employees: ["Петров В.В.", "Боширов Г.Г.", "Иванов М.Ю.", "Семенов П.В."],
    date: moment().format("YYYY-MM-DD"),
    menu: false,
  }),
  computed: {
      computedDate() {
        return this.date ? moment(this.date).format("YYYY-MM-DD") : ""
      },
    },
};
</script>
