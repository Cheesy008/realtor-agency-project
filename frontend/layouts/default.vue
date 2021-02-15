<template>
  <v-app>
    <AppNavigationSidebar v-if="$auth.loggedIn" />

    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Риэлтерское агенство</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text rounded v-if="!$auth.loggedIn" to="/login">
        Войти
      </v-btn>
      <v-btn text rounded v-else @click=" $auth.logout()" >
        Выйти
      </v-btn>

    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppNavigationSidebar from "~/components/UI/AppNavigationSidebar"

export default {
  components: {
    AppNavigationSidebar,
  }
};
</script>
