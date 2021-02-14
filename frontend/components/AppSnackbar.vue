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
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    snackbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeout: 2000,
    };
  },
  methods: {
    resetSnackbar() {
      this.$emit('resetSnackbar', false)
    }
  }
};
</script>

<style>
</style>
