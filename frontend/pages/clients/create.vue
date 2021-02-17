<template>
  <div>
    <v-card
      elevation="2"
      outlined
      shaped
      tile
      class="mx-auto mt-5"
      width="850"
    >
      <div class="v-card-align">
        <v-card-text>
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
        </v-card-text>
      </div>
    </v-card>
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
.v-card-align {
  width: 70%;
  margin: auto;
  padding-top: 20px;
}
</style>
