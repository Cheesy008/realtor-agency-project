<template>
  <div>
    <AppSnackbar
      :text="snackbarMessage"
      :snackbar="snackbar"
      @resetSnackbar="snackbar = $event"
    />
    <v-container>
      <v-card>
        <v-tabs v-model="tab" background-color="primary" dark>
          <v-tab v-for="item in items" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tab">
            <v-card flat>
              <v-card-text>
                <component :is="item.content" v-bind="item.props"></component>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

import ClientForm from "~/components/Clients/ClientForm";
import ClientRealtiesList from "~/components/Clients/ClientRealtiesList";

export default {
  components: {
    ClientForm,
  },
  data() {
    return {
      snackbarMessage: '',
      snackbar: false,

      tab: null,
      items: [
        {
          tab: 'Клиент',
          content: 'ClientForm',
          props: {
            client: {},
            callbackFunction: this.sendForm,
            mainTitle: "Просмотр клиента",
            buttonText: "Редактировать",
          }
        },
        {tab: 'Недвижимость клиента', content: 'ClientRealtiesList'}
      ]
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
        this.snackbarMessage = e.response.data.message
      }
    },
  },
  async fetch({store, params}) {
    if (store.state.auth.loggedIn) {
      await store.dispatch("clients/getClient", params.id);
    }
  },
  created() {
    this.items[0]['props']['client'] = {...this.storedClient};
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
