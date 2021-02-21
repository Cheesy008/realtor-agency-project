<template>
  <v-data-table
    :headers="headers"
    :items="userList"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Сотрудники</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Новый пользователь
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>

              <v-text-field
                v-model="userInfo.email"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="userInfo.password"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                label="Пароль"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              ></v-text-field>

              <v-text-field
                v-model="userInfo.fio"
                label="Ф.И.О."
                required
              ></v-text-field>

              <v-select
                v-model="userInfo.role"
                :items="roles"
                item-text="text"
                item-value="value"
                label="Роль"
                required
              ></v-select>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Отменить</v-btn>
              <v-btn color="blue darken-1" text @click="save"> Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
            >Вы действительно хотите удалить этого сотрудника?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
              >Отменить
              </v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteUserConfirm"
              >OK
              </v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editUser(item)"> mdi-pencil</v-icon>
      <v-icon small @click="deleteUser(item)"> mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import {mapActions, mapState} from "vuex";

import {USER_ROLES} from "~/utils/enums";

export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      showPassword: false,
      headers: [
        {
          text: 'Ф.И.О.',
          align: 'start',
          sortable: false,
          value: 'fio',
        },
        {text: 'E-mail', value: 'email'},
        {text: 'Должность', value: 'role'},
        {text: 'Действия', value: 'actions', sortable: false},
      ],
      roles: [
        {text: 'Админ', value: USER_ROLES.ADMIN},
        {text: 'Риелтор', value: USER_ROLES.REALTOR},
        {text: 'Менеджер', value: USER_ROLES.MANAGER},
      ],
      userInfo: {}
    }
  },
  computed: {
    ...mapState("users", {
      userToEdit: state => state.user
    }),
    formTitle() {
      return this.userInfo.id ? 'Редактирование пользователя' : 'Создание пользователя'
    },
    userList() {
      const res = JSON.parse(
        JSON.stringify(this.$store.getters["users/getUserListExceptCurrent"](this.$auth.user.id))
      )
      res.forEach(user => {
        switch (user.role) {
          case USER_ROLES.ADMIN:
            user.role = 'Админ'
            break
          case USER_ROLES.REALTOR:
            user.role = 'Риелтор'
            break
          case USER_ROLES.MANAGER:
            user.role = 'Менеджер'
            break
          default:
            user.role = 'Должность не определена'
        }
      })
      return res
    }
  },
  methods: {
    ...mapActions({
      createUser: "users/createUser",
      getUserList: "users/getUserList",
      getUser: "users/getUser",
      updateUser: "users/updateUser"
    }),
    closeDelete() {
      this.dialogDelete = false
    },
    close() {
      this.dialog = false
      this.userInfo = {}
    },
    deleteUserConfirm() {

    },
    deleteUser(user) {

    },
    async editUser(user) {
      await this.getUser(user.id)
      this.userInfo = {...this.userToEdit}
      this.dialog = true
    },
    async save() {
      this.$store.commit("snackbar/SET_SNACKBAR", true)
      if (!this.userInfo.id) {
        try {
          await this.createUser(this.userInfo)
          this.$store.commit("snackbar/SET_SNACKBAR_MESSAGE",
            "Пользователь успешно создан")
        } catch (e) {
          console.log(e)
          this.$store.commit("snackbar/SET_SNACKBAR_MESSAGE",
            "Произошла ошибка во время создания пользователя")
        }
      } else {
        try {
          await this.updateUser({userId: this.userInfo.id, user: this.userInfo})
          this.$store.commit("snackbar/SET_SNACKBAR_MESSAGE",
            "Пользователь успешно отредактирован")
        } catch (e) {
          console.log(e)
          this.$store.commit("snackbar/SET_SNACKBAR_MESSAGE",
            "Произошла ошибка во время редактирования пользователя")
        }
      }
      await this.getUserList()
      this.close()
    }
  },
  async fetch({store}) {
    if (store.state.auth.loggedIn) {
      await store.dispatch("users/getUserList");
    }
  }
};
</script>

<style>
</style>
