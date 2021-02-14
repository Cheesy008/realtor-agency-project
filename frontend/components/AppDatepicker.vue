<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Дата рождения"
        persistent-hint
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="date"
      no-title
      @input="dateWasChanged"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "AppDatepicker",
  props: {
    date: {
      required: true
    }
  },
  data() {
    return {
      menu: false,
    }
  },
  methods: {
    dateWasChanged(event) {
      this.menu = false;
      this.$emit('update:date', event)
    }
  }
}
</script>

<style scoped>

</style>
