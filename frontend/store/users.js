export const state = () => ({
  list: [],
  user: {}
})

export const getters = {
  getUserListExceptCurrent: state => currentUserId => {
    return state.list.filter(user => user.id !== currentUserId)
  }
}

export const mutations = {
  SET_USER_LIST(state, payload) {
    state.list = payload
  },
  SET_USER(state, payload) {
    state.user = payload
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
  async createUser({state}, user) {
    return this.$repositories.users.create(user);
  },
  async updateUser({state}, {userId, user}) {
    return this.$repositories.users.update(userId, user)
  }
}

