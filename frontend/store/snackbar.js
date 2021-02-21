export const state = () => ({
  snackbar: false,
  snackbarMessage: ''
})

export const getters = {

}

export const mutations = {
  SET_SNACKBAR: (state, payload) => state.snackbar = payload,
  SET_SNACKBAR_MESSAGE: (state, payload) => state.snackbarMessage = payload
}

export const actions = {

}

