export default ({ app, store }, inject) => {
  inject("notifier", {
    showMessage(message) {
      store.commit("snackbar/SET_SNACKBAR_MESSAGE", message);
    }
  });
};
