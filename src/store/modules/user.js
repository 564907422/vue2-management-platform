export default {
  namespaced: true,
  state: {
    userInfo: null
  },
  mutations: {
    updateUserInfo (state, obj) {
      sessionStorage.setItem('userInfo', JSON.stringify(obj))  // 添加到sessionStorage
      state.userInfo = obj
      console.info("用户信息：" + JSON.stringify(obj))
    },
    removerUserInfo (state, obj) {
      sessionStorage.removeItem('userInfo')
      state.userInfo = null
    }

  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    }
  }
}
