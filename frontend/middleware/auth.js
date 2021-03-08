export default ({store, redirect, route}) => {
  if (!store.getters['users/isAuthenticated'] && route.name !== 'login') redirect('/login')
}
