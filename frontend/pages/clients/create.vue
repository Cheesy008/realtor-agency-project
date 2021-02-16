<template>
  <div>
    <ClientForm
      :callback-function="sendForm"
      :is-creation="true"
      main-title="Создание клиента"
      button-text="Создать"
    />
    <AppSnackbar
      :text="snackbarMessage"
      :snackbar="snackbar"
      @resetSnackbar="snackbar = $event"
    />
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

import ClientForm from "~/components/Clients/ClientForm";

export default {
   components: {
    ClientForm,
  },
  data() {
    return {
      snackbarMessage: '',
      snackbar: false
    }
  },
  methods: {
    ...mapActions({
      createClient: "clients/createClient",
    }),
    async sendForm() {
      this.snackbar = true
      try {
        await this.createClient()
        await this.$router.push({name: 'clients'})
      } catch (e) {
        this.snackbarMessage = e.response.data.message
      }
    },
  },
}
</script>

<style scoped>

</style>
