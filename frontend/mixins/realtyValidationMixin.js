export const realtyValidationMixin = {
  computed: {
    addressErrors() {
      const errors = []
      if (!this.$v.realtyInfo.address.$dirty) return errors
      !this.$v.realtyInfo.address.required && errors.push('Адрес обязателен')
      return errors
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.realtyInfo.price.$dirty) return errors;
      !this.$v.realtyInfo.price.required && errors.push("Цена обязательна");
      return errors;
    },
  }
}
