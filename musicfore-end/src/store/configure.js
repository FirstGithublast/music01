
const configure={
  state: {
    HOST:'http://127.0.0.1:8088',
    activeName:'',   //当前选中的菜单名
    showAside:false, //是否显示播放中的歌曲列表
    signLogin:true, //判断是否登陆
    beforeRoute:'',  //跳转之前的路由
    chapter:false,  //是否是歌单歌手页面,
    icon:false,     //图标是否隐藏
  },
  getters: {
    activeName: state => {
      let activeName=state.activeName
      if (!activeName){
        activeName=JSON.parse(window.sessionStorage.getItem("activeName"))
      }
      return activeName
    },
    showAside: state => {
      let showAside=state.showAside
      if (!showAside){
        showAside=JSON.parse(window.sessionStorage.getItem("showAside"))
      }
      return showAside
    },
    signLogin: state => {
      let signLogin=state.signLogin
      if (!signLogin){
        signLogin=JSON.parse(window.sessionStorage.getItem("signLogin"))
      }
      return signLogin
    },
    chapter: state => {
      let chapter=state.chapter
      if (!chapter){
        chapter=JSON.parse(window.sessionStorage.getItem("chapter"))
      }
      return chapter
    },
    beforeRoute: state => {
      let beforeRoute=state.beforeRoute
      if (!beforeRoute){
        beforeRoute=JSON.parse(window.sessionStorage.getItem("beforeRoute"))
      }
      return beforeRoute
    },
    icon: state => {
      let icon=state.icon
      if (!icon){
        icon=JSON.parse(window.sessionStorage.getItem("icon"))
      }
      return icon
    }
  },
  mutations: {
    setActiveName:(state,activeName)=>{
      state.activeName=activeName
      window.sessionStorage.setItem('activeName',JSON.stringify(activeName))
    },
    setChapter:(state,chapter)=>{
      state.chapter=chapter
      window.sessionStorage.setItem('chapter',JSON.stringify(chapter))
    },
    setShowAside:(state,showAside)=>{
      state.showAside=showAside
      window.sessionStorage.setItem('showAside',JSON.stringify(showAside))
    },
    setSignLogin:(state,signLogin)=>{
      state.signLogin=signLogin
      window.sessionStorage.setItem('signLogin',JSON.stringify(signLogin))
    },
    setBeforeRoute:(state,beforeRoute)=>{
      state.beforeRoute=beforeRoute
      window.sessionStorage.setItem('beforeRoute',JSON.stringify(beforeRoute))
    },
    setIcon:(state,icon)=>{
      state.icon=icon
      window.sessionStorage.setItem('icon',JSON.stringify(icon))
    }
  },
  actions: {
  },
  modules: {
  }
}
export default configure
