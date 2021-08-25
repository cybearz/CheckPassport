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
      <v-card
        class="mx-auto"
        max-width="300"
        tile
      >
        <v-list>
          <div class="d-flex align-center">
            <v-subheader>Сотрудники</v-subheader>
            <v-btn
              x-small
              rounded
              dark
              color="indigo"
            >
              <v-icon size="16">mdi-plus</v-icon>
            </v-btn>
          </div>
          <v-list-item-group
            v-model="selectedItem"
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
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {

  },

  data: () => ({
    employees: ["Петров В.В.", "Боширов Г.Г.", "Иванов М.Ю.", "Семенов П.В."],
  }),
};
</script>
