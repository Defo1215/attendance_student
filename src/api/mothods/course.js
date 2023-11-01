import request from "../index"

const baseURL = "/course"

export default {
  save: (course) => {
    return request({
      url: `${baseURL}/save`,
      method: "POST",
      data: course
    })
  },

  findAll: () => {
    return request({
      url: `${baseURL}/findAll`,
      method: "GET"
    })
  },

  findByCourseId: (courseId) => {
    return request({
      url: `${baseURL}/findByCourseId?courseId=${courseId}`,
      method: "GET"
    })
  },

  findByCourse: (course) => {
    return request({
      url: `${baseURL}/findByCourse?course=${course}`,
      method: "GET",
    })
  },

  findByGradeAndMajorId: (grade, majorId) => {
    return request({
      url: `${baseURL}/findByGradeAndMajorId?grade=${grade}&majorId=${majorId}`,
      method: "GET",
    })
  },

  findByTeacherId: (teacherId) => {
    return request({
      url: `${baseURL}/findByTeacherId?teacherId=${teacherId}`,
      method: "GET",
    })
  },

  findByGradeAndTeacherId: (grade, teacherId) => {
    return request({
      url: `${baseURL}/findByGradeAndTeacherId?grade=${grade}&teacherId=${teacherId}`,
      method: "GET",
    })
  },

  checkByCourseIdAndStudentUsername: (data) => {
    return request({
      url: `${baseURL}/checkByCourseIdAndStudentUsername`,
      method: "GET",
      params: {
        courseId: data.courseId,
        studentUsername: data.studentUsername
      }
    })
  }
}