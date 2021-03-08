<template>
  <v-navigation-drawer app>
    <v-list class="mt-5">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ $auth.user.fio }}
          </v-list-item-title>
          <v-list-item-subtitle> {{ $auth.user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item
        class="mt-2"
        link
        v-for="(item, index) in navigationListItems"
        :to="item.link"
        :key="index"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      navigationListItems: [
        {icon: 'mdi-account', title: 'Профиль', link: '/profile'},
        {icon: 'mdi-office-building', title: 'Недвижимость', link: '/realties'},
        {icon: 'mdi-handshake', title: 'Сделки', link: '/transactions'},
        {icon: 'mdi-account-group', title: 'Клиенты', link: '/clients'},
        {icon: 'mdi-account-supervisor', title: 'Сотрудники', link: '/users'},
      ],
    }
  }
};
</script>

<style>
</style>
