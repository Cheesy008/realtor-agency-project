export const state = () => ({
  permissions: [
    {action: 'read', subject: 'realties'},
  ]
})

export const actions = {
  async nuxtServerInit({commit, state}, {redirect, req}) {
    const token = this.$cookies.get('Bearer')
    if (token) {
      commit('users/SET_TOKEN', token)

      const userResp = await this.$repositories.users.currentUser()
      commit('users/SET_CURRENT_USER', userResp.data.data)
    } else {
      redirect('/login')
    }
  }
}
