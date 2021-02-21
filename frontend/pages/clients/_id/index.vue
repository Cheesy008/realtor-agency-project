<template>
  <div>
    <v-container>
      <v-card min-height="700">
        <v-toolbar
          color="cyan"
          dark
          flat
        >
          <v-toolbar-title>Клиент</v-toolbar-title>
        </v-toolbar>
        <v-tabs v-model="tab" align-with-title>
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
    ClientRealtiesList
  },
  data() {
    return {
      tab: null,
      items: [
        {
          tab: 'Личная информация',
          content: 'ClientForm',
          props: {
            styles: 'v-card-align',
            client: {},
            callbackFunction: this.sendForm,
            buttonText: "Редактировать",
          }
        },
        {
          tab: 'Недвижимость',
          content: 'ClientRealtiesList'
        }
      ]
    }
  },
  computed: {
    ...mapState("clients", {
      storedClient: state => state.client,
      realtiesByClient: state => state.realtiesByClient
    }),
  },
  methods: {
    ...mapActions({
      updateClient: "clients/updateClient",
    }),
    async sendForm() {
      this.$store.commit("snackbar/SET_SNACKBAR", true)
      try {
        await this.updateClient()
        this.$store.commit("snackbar/SET_SNACKBAR_MESSAGE", "Клиент успешно отредактирован")
      } catch (e) {
        this.$store.commit("snackbar/SET_SNACKBAR_MESSAGE",  e.response.data.message)
      }
    },
  },
  async fetch({store, params}) {
    if (store.state.auth.loggedIn) {
      await store.dispatch("clients/getClient", params.id);
      await store.dispatch("clients/getRealtiesByClient", params.id);
    }
  },
  created() {
    this.items[0]['props']['client'] = {...this.storedClient};
  },
};
</script>

<style lang="scss">
.v-card-align {
  width: 50%;
  margin: auto;
  padding-top: 20px;
}
</style>
