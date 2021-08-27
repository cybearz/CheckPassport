<template>
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
          @click="$emit('addEmp')"
        >
          <v-icon size="16">mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-list-item-group
        color="primary"
      >
        <v-list-item 
        v-for="emp in emps"
          :key="emp"
          @click="$emit('showPassport', $event)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ emp }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    emps: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>