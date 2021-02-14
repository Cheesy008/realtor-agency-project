export const state = () => ({
  list: [],
  client: {}
})

export const getters = {
  getClient(state) {
    return state.client
  }
}

export const mutations = {
  SAVE_CLIENT_LIST(state, payload) {
    state.list = payload
  },
  SET_CLIENT(state, payload) {
    state.client = payload
  },
  UPDATE_CLIENT(state, payload) {
    state.client = {...state.client, ...payload}
  }
}

export const actions = {
  async fetchClients({commit}) {
    await this.$axios.get('clients')
      .then(res => commit("SAVE_CLIENT_LIST", res.data.data))
      .catch(err => console.log(err))
  },
  async retrieveClient({commit}, id) {
    await this.$axios.get(`clients/${id}`)
      .then(res => commit("SET_CLIENT", res.data.data))
      .catch(err => console.log(err))
  },
  async editClient({state}) {
    const client = state.client;
    await this.$axios.post(`clients/${client.id}/edit`, client)
      .catch(err => console.log(err))
  },
  async createClient({}, payload) {
    return await this.$axios.post('clients/create', payload)
  }
}

