<template>
  <v-app>
    <AppNavigationSidebar v-if="isAuthenticated"/>
    <AppSnackbar/>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Риэлтерское агенство</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text rounded v-if="!isAuthenticated" to="/login">
        Войти
      </v-btn>
      <v-btn text rounded v-else @click="logout">
        Выйти
      </v-btn>

    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppNavigationSidebar from "~/components/UI/AppNavigationSidebar"
import AppSnackbar from "~/components/UI/AppSnackbar";

import {mapGetters} from 'vuex'

export default {
  components: {
    AppNavigationSidebar,
    AppSnackbar
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/isAuthenticated'
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('users/logout')
      this.$router.push({name: 'login'})
      location.reload()
    }
  },
};
</script>
