<template>
  <div>
    <ClientDataTable :clients="clients"/>
  </div>
</template>

<script>
import {mapState} from "vuex"

import ClientDataTable from "~/components/Clients/ClientDataTable";

export default {
  components: {
    ClientDataTable
  },
  computed: {
    ...mapState('clients', {
      clients: state => state.list
    })
  },
  async fetch({store}) {
    if (store.getters['users/isAuthenticated']) {
      await store.dispatch("clients/getClientList");
    }
  }
}
</script>

<style>

</style>
