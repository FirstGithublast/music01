const user={
  state: {
    user:'', //用户对象
    avator:false,
    token:''
  },
  getters: {
    user: state => {
      let user = state.user
      if (!user) {
        user = JSON.parse(window.sessionStorage.getItem('user') || null)
      }
      return user
    },
    token: state => {
      let token = state.token
      if (!token) {
        token = JSON.parse(window.localStorage.getItem('token') || null)
      }
      return token
    },
    avator: state => {
      let avator = state.avator
      if (!avator) {
        avator = JSON.parse(window.sessionStorage.getItem('avator') || null)
      }
      return avator
    },
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
      window.sessionStorage.setItem('user', JSON.stringify(user))
    },
    setAvator: (state, avator) => {
      state.avator = avator
      window.sessionStorage.setItem('avator', JSON.stringify(avator))
    },
    setToken: (state, token) => {
      state.token = token
      window.localStorage.setItem('token', token)
    },
  },
  actions: {
  },
  modules: {
  }
}
export default user
