import requests from "./request";


export const login = (data) => requests({ url: '/user/login', data, method: 'post' })
export const register  = (data) => requests({ url: '/user/signUp', data, method: 'post' })


//课程
export const createCourse = (data) => requests({ url: '/course/add', data, method: 'post' })
export const getCourseList = (data) => requests({ url: '/course/getMainPage', method: 'post', data} )

//考试
export const addExam = (data) => requests({ url: '/exam/add', data, method: 'post' })
export const deleteExam = (data) => requests({ url: '/exam/delete', data, method: 'post' })
export const updateExam = (data) => requests({ url: '/exam/update', data, method: 'post' })
export const getExamList = (data) => requests({ url: '/exam/getExamMainPage', method: 'post', data} )

//通知
export const addNotice = (data) => requests({ url: '/notice/add', data, method: 'post' })
export const deleteNotice = (data) => requests({ url: '/notice/delete', data, method: 'post', params: data })
export const updateNotice = (data) => requests({ url: '/notice/update', data, method: 'post' })
export const getNoticeList = (data) => requests({ url: '/notice/getNoticeMainPage', method: 'post', data} )