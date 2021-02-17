export const userValidationMixin = {
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.userInfo.email.$dirty) return errors
      !this.$v.userInfo.email.email && errors.push('E-mail должен быть корректным')
      !this.$v.userInfo.email.required && errors.push('E-mail обязателен')
      return errors
    },
    fioErrors() {
      const errors = [];
      if (!this.$v.userInfo.fio.$dirty) return errors;
      !this.$v.userInfo.fio.required && errors.push("ФИО обязательны");
      return errors;
    },
  }
}
