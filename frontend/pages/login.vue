<template>
  <v-app>
    <AuthForm title="Вход">
      <v-text-field
        v-model="userInfo.email"
        label="E-mail"
        :error-messages="emailErrors"
        @input="$v.userInfo.email.$touch()"
        prepend-icon="mdi-account-circle"
      />
      <v-text-field
        v-model="userInfo.password"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        label="Пароль"
        :error-messages="passwordErrors"
        @input="$v.userInfo.password.$touch()"
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      />
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          color="info"
          class="mt-3"
          type="submit"
          @click.prevent="submitForm"
        >Войти
        </v-btn
        >
      </v-card-actions>
    </AuthForm>
  </v-app>
</template>

<script>
import {required, email, minLength} from "vuelidate/lib/validators";

import {authValidationMixin} from "~/mixins/authValidationMixin";
import AuthForm from "~/components/Auth/AuthForm";

export default {
  components: {
    AuthForm,
  },
  mixins: [authValidationMixin],
  data() {
    return {
      userInfo: {
        email: null,
        password: null,
      },
      showPassword: false,
    }
  },
  validations: {
    userInfo: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    async submitForm() {
      this.$v.$touch();
      if (!this.$v.$error) {
        const payload = {
          Email: this.userInfo.email,
          Password: this.userInfo.password,
        }

        try {
          await this.$store.dispatch('users/authenticateUser', payload)
          await this.$router.push({name: 'profile'})
        } catch (e) {
          this.$notifier.showMessage(e.response.data.message)
        }
      }
    },
  },
};
</script>

<style scoped>
</style>
