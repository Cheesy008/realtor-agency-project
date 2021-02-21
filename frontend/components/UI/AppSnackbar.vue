<template>
  <v-snackbar :value="snackbar" @input="resetSnackbar" :timeout="timeout">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="resetSnackbar">
        Закрыть
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      timeout: 2000,
    };
  },
  computed: {
    ...mapState('snackbar', {
      text: state => state.snackbarMessage,
      snackbar: state => state.snackbar
    }),
  },
  methods: {
    resetSnackbar() {
      this.$store.commit("snackbar/SET_SNACKBAR", false)
    }
  }
};
</script>

<style>
</style>
