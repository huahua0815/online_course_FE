import requests from "./request";


export const login = (data) => requests({ url: '/user/login', data, method: 'post' })
export const register  = (data) => requests({ url: '/user/signUp', data, method: 'post' })
export const getUserList = (params) => requests({ url: '/user/getUserList', params, method: 'get' })

//学生管理
export const deleteStudent = (id) => requests({ url: `/admin/student/${id}`, method: 'delete' })

export const createTeacher = (data)=>requests({ url: '/admin/teacher', data, method: 'post' })
export const getTeacherById = (id) => requests({ url: `/admin/teacher/${id}`, method: 'get' })
export const deleteTeacher = (id) => requests({ url: `/admin/teacher/${id}`, method: 'delete' })
export const updateTeacher = (data) => requests({ url: '/admin/teacher/update', data, method: 'post' })

export const createCourse = (data) => requests({ url: '/course/add', data, method: 'post' })
export const getCourseList = (data) => requests({ url: '/course/getMainPage', method: 'post', data} )
export const getCourseFileList = (data) => requests({ url: '/course/getCoverByCourseIdList', method: 'post', data,responseType: 'blob',headers: { 'Content-Type': 'application/json; application/octet-stream' }} )
export const updateCourse = (data) => requests({ url: '/course/update', data, method: 'post' })
export const deleteCourse = (params) => requests({ url: '/course/delete', method: 'get',params })

//选课关系
export const addSC = (data) => requests({ url: '/selectCourse/add', data, method: 'post' })
export const getSCByStudentId = (params) => requests({ url: '/selectCourse/getCourseListByStudentId', method: 'get', params} )
export const updateSC = (data) => requests({ url: '/selectCourse/update', data, method: 'post' })

//留言
export const createComment = (data) => requests({ url: '/comment/addComment', data, method: 'post' })
export const createReply = (data) => requests({ url: '/comment/addReply', data, method: 'post' })
export const getCommentList = (params) => requests({ url: '/comment/getComment', method: 'get', params} )
export const getCommentById =  (params) => requests({ url: '/comment/getCommentByUserId', method: 'get', params} )
export const deleteComment = (params) => requests({ url: '/comment/delete', method: 'get', params} )

//考试
export const addExam = (data) => requests({ url: '/exam/add', data, method: 'post' })
export const deleteExam = (params) => requests({ url: '/exam/delete', params, method: 'get' })
export const updateExam = (data) => requests({ url: '/exam/update', data, method: 'post' })
export const getExamList = (data) => requests({ url: '/exam/getExamMainPage', method: 'post', data} )
export const getExamByStudentId = (params) => requests({ url: '/exam/getExamListByStudentId', method: 'get', params} )
export const getExamByTeacherId = (params) => requests({ url: '/exam/getExamListByTeacherId', method: 'get', params} )

//通知
export const addNotice = (data) => requests({ url: '/notice/add', data, method: 'post' })
export const deleteNotice = (params) => requests({ url: '/notice/delete', method: 'get', params })
export const updateNotice = (data) => requests({ url: '/notice/update', data, method: 'post' })
export const getNoticeList = (data) => requests({ url: '/notice/getNoticeMainPage', method: 'post', data} )

//发布作业
export const addHomework = (data) => requests({ url: '/homework/add', data, method: 'post' })
export const updateHomework  = (data) => requests({ url: '/homework/update', data, method: 'post' })
export const deleteHomework  = (data) => requests({ url: '/homework/delete', data, method: 'post' })
export const getHomeworkList = (params) => requests({ url: '/homework/getHomeworkByCourseId', method: 'get', params} )