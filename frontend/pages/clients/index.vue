<template>
  <div>
    <v-btn class="mx-auto">Создать клиента</v-btn>
    <v-card
      max-width="600"
      class="mx-auto">
      <ClientList :clients="clients"/>
    </v-card>
  </div>
</template>

<script>
import {mapState} from "vuex"

import ClientList from '~/components/Clients/ClientList';

export default {
  components: {
    ClientList
  },
  computed: {
    ...mapState('clients', {
      clients: state => state.list
    })
  },
  async fetch({store}) {
    if (store.state.auth.loggedIn) {
      await store.dispatch("clients/fetchClients");
    }
  }

}
</script>

<style>

</style>
