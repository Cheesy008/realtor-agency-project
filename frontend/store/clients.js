export const state = () => ({
  list: [],
  client: {},
  realtiesByClient: []
})

export const getters = {
  getClient(state) {
    return state.client
  }
}

export const mutations = {
  SET_CLIENT_LIST(state, payload) {
    state.list = payload
  },
  SET_CLIENT(state, payload) {
    state.client = payload
  },
  UPDATE_CLIENT(state, payload) {
    state.client = {...state.client, ...payload}
  },
  SET_REALTIES_BY_CLIENT(state, payload) {
    state.realtiesByClient = payload
  }
}

export const actions = {
  async getClientList({commit}) {
    try {
      const res = await this.$repositories.clients.all();
      commit("SET_CLIENT_LIST", res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  async getClient({commit}, id) {
    try {
      const res = await this.$repositories.clients.retrieve(id);
      commit("SET_CLIENT", res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  async createClient({state}) {
    const client = state.client;
    return this.$repositories.clients.create(client);
  },
  async updateClient({state}) {
    const client = state.client;
    return this.$repositories.clients.update(client.id, client)
  },
  async getRealtiesByClient({commit}, id) {
    try {
      const res = await this.$repositories.clients.getClientRealties(id);
      commit("SET_REALTIES_BY_CLIENT", res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  async uploadClientPhoto({}, {id, photo}) {
    try {
      const res = await this.$repositories.clients.uploadClientPhoto(id, photo)
      return res.data.message
    } catch (err) {
      console.log(err)
    }
  }
}

