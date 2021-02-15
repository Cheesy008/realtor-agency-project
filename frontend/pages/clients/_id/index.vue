<template>
  <div>
    <ClientForm
      :client="client"
      :callback-function="sendForm"
      main-title="Просмотр клиента"
      button-text="Редактировать"
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
      client: {},
      snackbarMessage: '',
      snackbar: false
    }
  },
  computed: {
    ...mapState("clients", {
      storedClient: (state) => state.client,
    }),
  },
  methods: {
    ...mapActions({
      updateClient: "clients/updateClient",
    }),
    async sendForm() {
      this.snackbar = true
      try {
        await this.updateClient()
        this.snackbarMessage = 'Клиент успешно отредактирован'
      } catch (e) {
        this.snackbarMessage = 'Произошла ошибка во время редактирования клиента'
      }
    },
  },
  async fetch({store, params}) {
    if (store.state.auth.loggedIn) {
      await store.dispatch("clients/getClient", params.id);
    }
  },
  created() {
    this.client = {...this.storedClient};
  },
};
</script>

<style lang="scss">
.v-card-align {
  width: 70%;
  margin: auto;
  padding-top: 20px;
}
</style>
