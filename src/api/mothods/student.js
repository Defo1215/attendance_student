import request from "../index"

const baseURL = "/student"

export default {
  login: (student) => {
    return request({
      url: `${baseURL}/login`,
      method: "POST",
      data: student,
    });
  },
  
  save: (student) => {
    return request({
      url: `${baseURL}/save`,
      method: "POST",
      data: student
    })
  },

  findAll: () => {
    return request({
      url: `${baseURL}/findAll`,
      method: "GET"
    })
  },

  findByStudentId: (studentId) => {
    return request({
      url: `${baseURL}/findByStudentId?studentId=${studentId}`,
      method: "GET"
    })
  },

  findStudentByMajorIdAndGradeAndStudentId: (majorId, grade, studentId) => {
    return request({
      url: `${baseURL}/findStudentByMajorIdAndGradeAndStudentId?majorId=${majorId}&grade=${grade}&studentId=${studentId}`,
      method: "GET"
    })
  }

}