export const state = () => ({
  list: [],
  user: {},

  currentUser: {},
  token: null
})

export const getters = {
  getUserListExceptCurrent(state) {
    return state.list.filter(user => user.id !== state.currentUser.id)
  },
  isAuthenticated(state) {
    return state.token != null;
  }
}

export const mutations = {
  SET_USER_LIST(state, payload) {
    state.list = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },

  SET_TOKEN(state, token) {
    state.token = token;
  },
  CLEAR_TOKEN(state) {
    state.token = null;
  },
  SET_CURRENT_USER(state, payload) {
    state.currentUser = payload
  }
}

export const actions = {
  async authenticateUser({commit}, payload) {
    const loginResp = await this.$axios.post('auth/login/', payload)
    const token = loginResp.data.data

    commit('SET_TOKEN', token)
    this.$cookies.set('Bearer', token)
    this.$axios.setHeader('Authorization', `Bearer ${token}`)

    const userResp = await this.$repositories.users.currentUser()
    commit('SET_CURRENT_USER', userResp.data.data)
  },
  logout({commit}) {
    commit("CLEAR_TOKEN");
    this.$cookies.remove("Bearer");
  },
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
  async createUser({state}, user) {
    return this.$repositories.users.create(user);
  },
  async updateUser({state}, {userId, user}) {
    return this.$repositories.users.update(userId, user)
  }
}

