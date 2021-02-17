export const state = () => ({
  list: [],
  user: {},
})

export const getters = {
}

export const mutations = {
  SET_USER_LIST(state, payload) {
    state.list = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
  UPDATE_USER(state, payload) {
    state.user = {...state.user, ...payload}
  }
}

export const actions = {
  async getUserList({commit}) {
    try {
      const res = await this.$repositories.users.all();
      commit("SET_USER_LIST", res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  async getUser({commit}, id) {
    try {
      const res = await this.$repositories.users.retrieve(id);
      commit("SET_USER", res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  async getCurrentUser({commit}) {
    try {
      const res = await this.$repositories.users.currentUser();
      commit("SET_USER", res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  async createUser({state}) {
    const client = state.client;
    return this.$repositories.users.create(client);
  },
  async updateUser({state}) {
    const user = state.user;
    return this.$repositories.users.update(user.id, user)
  }
}

