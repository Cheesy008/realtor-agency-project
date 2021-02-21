export const state = () => ({
  list: [],
  realty: {}
})

export const getters = {
}

export const mutations = {
  SET_REALTY_LIST(state, payload) {
    state.list = payload
  },
  SET_REALTY(state, payload) {
    state.realty = payload
  }
}

export const actions = {
  async getRealtyList({commit}) {
    try {
      const res = await this.$repositories.realties.all();
      commit("SET_REALTY_LIST", res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  async getRealty({commit}, id) {
    try {
      const res = await this.$repositories.realties.retrieve(id);
      commit("SET_REALTY", res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  async createRealty({state}, realty) {
    return this.$repositories.realties.create(realty);
  },
  async addRealtyOwner({state}, {realtyId, ownerId}) {
    try {
      return this.$repositories.realties.addRealtyOwner(realtyId, ownerId);
    } catch (err) {
      console.log(err)
    }
  }
}

