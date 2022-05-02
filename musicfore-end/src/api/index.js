import {post,get} from "@/api/http";

//获取验证码
export const captcha=()=>post(`/captcha`)

// 是否登录成功
export const getLoginStatus = (params) => post(`/admin/login/status`, params)
//查询歌手
export const getAllSinger=(params)=>post(`/singer/allSinger`,params)

                /*歌曲列表*/
//查询歌手歌曲
export const getAllSingerSong=(id)=>post(`/song/selectBySigerId/`+id)
//模糊查询歌手歌曲
export const getAllSongName=(name)=>post(`/song/songOfName/${name}`)
//查询全部歌曲
export const getAllSong=()=>post(`/song/allSongs`)
          /*歌单*/
//查询歌单
export const getAllSongList=(params)=>post(`/songlist/allSonglist`,params)
//通过歌单标题查询歌单
export const getSongListOfTitle=(title)=>post(`/songlist/SongListOfTitle/${title}`,)
        /*歌单列表*/
//查询歌单歌曲
export  const getAllListSong=(id)=>post(`/listsong/listAllSong/`+id)
    /*用户列表*/
//查询所有用户
export const getallConsumer=()=>post(`/consumer/allConsumer`)
//通过用户查询
export const getUserById=(id)=>post(`/consumer/selectConsumerById/${id}`)

//下载音乐
export const download=(url)=>Axios({
  methods:'get',
  url:url,
  responseType:'blob'  //响应数据类型 文件转化成blob
})

                    /*//评分*/
//获取平均分
export const getScore=(id)=>post(`/rank/seleteScore/${id}`)
//添加评分
export const addRank=(params)=>post(`/rank/add`,params)

            /*    评论*/
//获取所有评论信息
export const getComment=()=>post(`/comment/seleteComment`)
//添加
export const addComment=(params)=>post(`/comment/add`,params)

//登陆
export const logins=(params)=>post(`/login?${params}`)