<template>
  <v-card
    elevation="2"
    outlined
    shaped
    tile
    class="mx-auto mt-5"
    width="850"
  >
    <AppSnackbar
      :text="snackbarMessage"
      :snackbar="snackbar"
      @resetSnackbar="snackbar = $event"
    />

    <div class="v-card-align">
      <v-card-title>Ваш профиль</v-card-title>
      <v-card-text>
        <v-form>

          <v-text-field
            v-model="userInfo.email"
            label="E-mail"
            :error-messages="emailErrors"
            @input="$v.userInfo.email.$touch()"
          />

          <v-text-field
            label="ФИО"
            :error-messages="fioErrors"
            v-model="userInfo.fio"
            @input="$v.userInfo.fio.$touch()"
          ></v-text-field>

          <v-btn
            color="info"
            class="mt-3"
            type="submit"
            @click.prevent="sendForm"
          >Редактировать
          </v-btn>

        </v-form>
      </v-card-text>
    </div>

  </v-card>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  numeric, email,
} from "vuelidate/lib/validators";
import {mapMutations, mapActions} from "vuex";

import AppDatepicker from "~/components/UI/AppDatepicker";
import {userValidationMixin} from "~/mixins/userValidationMixin";

export default {
  components: {
    AppDatepicker
  },
  mixins: [userValidationMixin],
  props: {
    userInfo: {
      type: Object,
      default() {
        return {
          email: "",
          fio: "",
        }
      }
    },
  },
  validations: {
    userInfo: {
      email: {
        required,
        email,
      },
      fio: {
        required,
      },
    }
  },
  data() {
    return {
      snackbarMessage: '',
      snackbar: false,
    }
  },
  computed: {},
  methods: {
    ...mapMutations({
      updateUser: "users/UPDATE_USER",
    }),
    ...mapActions({
      sendUpdatedUser: "users/updateUser",
    }),
    async sendForm() {
      this.updateUser(this.userInfo)

      this.snackbar = true
      try {
        await this.sendUpdatedUser()
        this.snackbarMessage = 'Профиль успешно отредактирован'
      } catch (e) {
        this.snackbarMessage = e.response.data.message
      }
    }
  },
};
</script>

<style lang="scss">
.v-card-align {
  width: 70%;
  margin: auto;
  padding-top: 20px;
}
</style>
