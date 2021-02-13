export const authValidationMixin = {
    computed: {
        emailErrors () {
            const errors = []
            if (!this.$v.userInfo.email.$dirty) return errors
            !this.$v.userInfo.email.email && errors.push('E-mail должен быть корректным')
            !this.$v.userInfo.email.required && errors.push('E-mail обязателен')
            return errors
          },
        passwordErrors () {
            const errors = []
            if (!this.$v.userInfo.password.$dirty) return errors
            !this.$v.userInfo.password.minLength && errors.push('Минимальная длина пароля должна составлять 6 символов')
            !this.$v.userInfo.password.required && errors.push('Пароль обязателен')
            return errors
          },
    }
  }
  