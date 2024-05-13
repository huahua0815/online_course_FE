import requests from "./request";


export const login = (data) => requests({ url: '/user/login', data, method: 'post' })
export const register  = (data) => requests({ url: '/user/signUp', data, method: 'post' })


//课程
export const createCourse = (data) => requests({ url: '/course/add', data, method: 'post' })
export const getCourseList = (data) => requests({ url: '/course/getMainPage', method: 'post', data} )
export const getCourseFileList = (data) => requests({ url: '/course/getCoverByCourseIdList', method: 'post', data,responseType: 'blob',headers: { 'Content-Type': 'application/json; application/octet-stream' }} )
export const updateCourse = (data) => requests({ url: '/course/update', data, method: 'post' })
export const deleteCourse = (data) => requests({ url: '/course/delete', data, method: 'post' })

//考试
export const addExam = (data) => requests({ url: '/exam/add', data, method: 'post' })
export const deleteExam = (params) => requests({ url: '/exam/delete', params, method: 'get' })
export const updateExam = (data) => requests({ url: '/exam/update', data, method: 'post' })
export const getExamList = (data) => requests({ url: '/exam/getExamMainPage', method: 'post', data} )

//通知
export const addNotice = (data) => requests({ url: '/notice/add', data, method: 'post' })
export const deleteNotice = (params) => requests({ url: '/notice/delete', method: 'get', params })
export const updateNotice = (data) => requests({ url: '/notice/update', data, method: 'post' })
export const getNoticeList = (data) => requests({ url: '/notice/getNoticeMainPage', method: 'post', data} )

//发布作业
export const addHomework = (data) => requests({ url: '/homework/add', data, method: 'post' })
export const updateHomework  = (data) => requests({ url: '/homework/update', data, method: 'post' })
export const deleteHomework  = (data) => requests({ url: '/homework/delete', data, method: 'post' })
export const getHomeworkList = (data) => requests({ url: '/homework/getHomeworkByScId', method: 'post', data} )