<template>
  <v-card width="900" class="mx-auto mt-5">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="clients"
      :search="search"
      @click:row="client => $router.push({name: 'clients-id', params: {id: client.id}})"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Новый клиент</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-btn
              color="primary"
              dark
              class="mb-2"
              to="/clients/create"
            >
              Создать клиента
            </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    clients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      headers: [
        {text: 'ФИО', value: 'fio', align: 'start'},
        {text: 'ИИН', value: 'iin'},
        {text: 'Дата рождения', value: 'birthDate'},
      ]
    }
  }
};
</script>

<style>
</style>
