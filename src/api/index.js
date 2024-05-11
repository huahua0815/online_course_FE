import requests from "./request";


export const login = (data) => requests({ url: '/user/login', data, method: 'post' })
export const register  = (data) => requests({ url: '/user/signUp', data, method: 'post' })

export const createCourse = (data) => requests({ url: '/course/add', data, method: 'post' })
export const getNoticeList = (data) => requests({ url: '/notice/getNoticeMainPage', method: 'post', data} )