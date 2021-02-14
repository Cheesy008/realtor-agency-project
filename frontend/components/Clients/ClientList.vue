<template>
  <v-list three-line class="mt-5">
    <template v-for="(client, index) in clients">
      <v-list-item :key="client.id" link :to="`clients/${client.id}`">
        <v-list-item-content>
          <v-list-item-title v-text="client.fio"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider :key="index" inset></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    clients: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>
