<template>
  <div class="container">
    <RealtiesModalForm :callback-function="createRealtyWithOwner" />
    <v-row no-gutters v-if="realties">
      <v-col v-for="(item, i) in realties" :key="i" cols="4">
        <v-card class="mx-auto" max-width="344">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>

          <v-card-title> {{ item.address }} </v-card-title>
          <v-card-subtitle> {{ item.price }} </v-card-subtitle>
          <v-card-actions>
            <v-btn color="error" text> Удалить </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <h2 v-else class="font-weight-bold" style="margin-top: 200px">Пусто</h2>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import RealtiesModalForm from "~/components/Realties/RealtiesModalForm";

export default {
  components: {
    RealtiesModalForm,
  },
  computed: {
    ...mapState("clients", {
      realties: (state) => state.realtiesByClient,
    }),
  },
  methods: {
    ...mapActions({
      createRealty: "realties/createRealty",
      addRealtyOwner: "realties/addRealtyOwner",
      getRealtiesByClient: "clients/getRealtiesByClient",
    }),
    async createRealtyWithOwner(realty) {
      this.$store.commit("snackbar/SET_SNACKBAR", true)
      try {
        const resp = await this.createRealty(realty);
        const realtyId = resp.data.data;
        const ownerId = this.$route.params.id;
        await this.addRealtyOwner({ realtyId, ownerId });
        await this.getRealtiesByClient(ownerId);
        this.$store.commit("snackbar/SET_SNACKBAR_MESSAGE", "Недвижимость создана")
      } catch (e) {
        console.log(e);
        this.$store.commit("snackbar/SET_SNACKBAR_MESSAGE", "Произошла ошибка во время создания")
      }
    },
  },
  created() {
    console.log("ASD", this.realties);
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
}
</style>
