<template>
  <v-snackbar :value="show" @input="show = false" :timeout="timeout">
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="show = false">
        Закрыть
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      timeout: 2000,
      show: false,
      message: "",
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/SET_SNACKBAR_MESSAGE") {
        this.message = state.snackbar.snackbarMessage;
        this.show = true;
      }
    });
  }
};
</script>

<style>
</style>
