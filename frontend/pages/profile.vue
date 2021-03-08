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
    storedUser() {
      return this.$store.state.auth.user
    }
  },
  created() {
    this.user = {...this.storedUser};
  }
}
</script>

<style>

</style>
