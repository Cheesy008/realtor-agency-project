<template>
  <div>
    <ProfileForm :user-info="user" />
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

import ProfileForm from "~/components/Profile/ProfileForm";

export default {
  components: {
    ProfileForm
  },
  data() {
    return {
      user: {}
    }
  },
  computed: {
    ...mapState("users", {
      storedUser: (state) => state.user,
    }),
  },
  async fetch({store, params}) {
    if (store.state.auth.loggedIn) {
      await store.dispatch("users/getCurrentUser");
    }
  },
  created() {
    this.user = {...this.storedUser};
  }
}
</script>

<style>

</style>
