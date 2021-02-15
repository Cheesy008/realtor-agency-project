<template>
  <v-card
    elevation="2"
    outlined
    shaped
    tile
    class="mx-auto mt-5"
    width="850"
  >
    <input ref="file" type="file" hidden @change="onPhotoPicked">
    <div class="v-card-align">
      <v-card-title>{{ mainTitle }}</v-card-title>
      <v-card-text>
        <v-form>
          <div>

            <template v-if="!isCreation">
              <v-avatar
              class="profile"
              color="grey"
              size="164"
              tile>
              <v-img :src="photoSrc"></v-img>
            </v-avatar>

            <v-btn class="ml-4" @click="onPickPhoto">Изменить фото</v-btn>
            </template>

          </div>

          <v-text-field
            label="ФИО"
            :error-messages="fioErrors"
            v-model="client.fio"
            @input="$v.client.fio.$touch()"
          ></v-text-field>

          <v-text-field
            label="ИИН"
            :error-messages="iinErrors"
            v-model="client.iin"
            @input="$v.client.iin.$touch()"
          ></v-text-field>

          <AppDatepicker :date.sync="client.birthDate"/>

          <v-btn
            color="info"
            class="mt-3"
            type="submit"
            @click.prevent="sendForm"
          >{{ buttonText }}
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
  numeric,
} from "vuelidate/lib/validators";
import {mapMutations, mapActions} from "vuex";

import AppDatepicker from "~/components/UI/AppDatepicker";

export default {
  components: {
    AppDatepicker
  },
  props: {
    client: {
      type: Object,
      default() {
        return {
          fio: "",
          iin: "",
          birthDate: null,
          photo: null,
        }
      }
    },
    callbackFunction: {
      type: Function,
      required: true
    },
    mainTitle: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    isCreation: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    client: {
      fio: {
        required,
      },
      iin: {
        required,
        minLength: minLength(12),
        maxLength: maxLength(12),
        numeric,
      },
    },
  },
  computed: {
    fioErrors() {
      const errors = [];
      if (!this.$v.client.fio.$dirty) return errors;
      !this.$v.client.fio.required && errors.push("ФИО обязательны");
      return errors;
    },
    iinErrors() {
      const errors = [];
      if (!this.$v.client.iin.$dirty) return errors;
      !this.$v.client.iin.minLength && errors.push("Минимальная длина ИИН должна составлять 12 символов");
      !this.$v.client.iin.maxLength && errors.push("Максимальная длина ИИН должна составлять 12 символов");
      !this.$v.client.iin.required && errors.push("ИИН обязателен");
      !this.$v.client.iin.numeric && errors.push("Значения ИИН должны быть числовыми");
      return errors;
    },
    photoSrc: {
      get() {
        return `https://localhost:44349${this.client.photo}`
      },
      set(newValue) {
        this.client.photo = newValue;
      }
    }
  },
  methods: {
    ...mapMutations({
      updateClient: "clients/UPDATE_CLIENT",
    }),
    ...mapActions({
      uploadClientPhoto: "clients/uploadClientPhoto"
    }),
    onPickPhoto() {
      this.$refs.file.click()
    },
    async onPhotoPicked(event) {
      const selectedPhoto = event.target.files[0];

      const fd = new FormData();
      fd.append('photo', selectedPhoto);

      const photo = await this.uploadClientPhoto({id: this.client.id, photo: fd})
      this.photoSrc = `https://localhost:44349${photo}`
    },
    async sendForm() {
      this.$v.$touch();

      if (!this.$v.$error) {
        this.updateClient(this.client)
        await this.callbackFunction()

      }
    },
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
