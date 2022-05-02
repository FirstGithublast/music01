import {post,get} from "@/api/http";

// 是否登录成功
export const getLoginStatus = (params) => post(`/admin/login/status`, params)

//添加歌手
export const setSinger=(params) =>post(`/singer/add`,params)
//查询歌手
export const getAllSinger=(params)=>post(`/singer/allSinger`,params)
//编辑歌手
export const updateSinger=(params)=>post(`/singer/update`,params)
//删除歌手
export const deleteSinger=(id)=>post(`/singer/delete/`+id)

                /*歌曲列表*/
//查询歌手歌曲
export const getAllSingerSong=(id)=>post(`/song/selectBySigerId/`+id)
//编辑歌曲
export  const updateSong=(params)=>post(`/song/update`,params)
//删除歌曲
export  const deleteSong=(id)=>post(`/song/delete?id=${id}`)
//查询全部歌曲
export const getAllSong=()=>post(`/song/allSongs`)
          /*歌单*/
//添加歌单
export const assSongList=(params) =>post(`/songlist/add`,params)
//查询歌单
export const getAllSongList=(params)=>post(`/songlist/allSonglist`,params)
//编辑歌单
export const updateSongList=(params)=>post(`/songlist/update`,params)
//删除歌单
export const deleteSongList=(id)=>post(`/songlist/delete/`+id)
        /*歌单列表*/
//查询歌单歌曲
export  const getAllListSong=(id)=>post(`/listsong/listAllSong/`+id)
//添加歌单歌曲
export const addListSong=(params) =>post(`/listsong/add`,params)
//删除歌单歌曲
export const deleteListSong=(id,songListId)=>post(`/listsong/delete?id=${id}&songListId=${songListId}`)
    /*用户列表*/
//查询用户
export const getallConsumer=()=>post(`/consumer/allConsumer`)
//添加用户
export const addConsumer=(params) =>post(`/consumer/add`,params)