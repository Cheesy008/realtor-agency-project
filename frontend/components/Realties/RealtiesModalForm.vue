<template>
<v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Создать новую запись
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Создание недвижимости</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Адрес"
                  :error-messages="addressErrors"
                  v-model="realtyInfo.address"
                  @input="$v.realtyInfo.address.$touch()"
                ></v-text-field>
                <v-text-field
                  label="Цена"
                  type="number"
                  :error-messages="priceErrors"
                  v-model.number="realtyInfo.price"
                  @input="$v.realtyInfo.price.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="sendForm"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {required} from "vuelidate/lib/validators";

import {realtyValidationMixin} from "~/mixins/realtyValidationMixin";

export default {
  mixins: [realtyValidationMixin],
  props: {
    callbackFunction: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      realtyInfo: {
        address: null,
        price: null
      }
    }
  },
  validations: {
    realtyInfo: {
      address: {
        required,
      },
      price: {
        required,
      },
    }
  },
  methods: {
    async sendForm() {
      this.$v.$touch();

      if (!this.$v.$error) {
        await this.callbackFunction(this.realtyInfo)
        this.dialog = false
        this.realtyInfo = {}
        this.$v.$reset()
      }
    }
  }
}
</script>

<style scoped>

</style>
