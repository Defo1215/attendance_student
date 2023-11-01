import request from "../index";

const baseURL = "/record";

export default {
  save: (record) => {
    return request({
      url: `${baseURL}/save`,
      method: "POST",
      data: record,
    });
  },

  findGroupByTeacherId: (teacherId) =>
    request({
      url: `${baseURL}/findGroupByTeacherId`,
      method: "GET",
      params: { teacherId },
    }),

  findNotSignedByMajorIdAndGradeAndClassAndCourseIdAndDate: (data) =>
    request({
      url: `${baseURL}/findNotSignedByMajorIdAndGradeAndClassAndCourseIdAndDate`,
      method: "GET",
      params: {
        majorId: data.majorId,
        grade: data.grade,
        class: data.class,
        courseId: data.courseId,
        date: data.date,
      },
    }),

  findSignedByCourseIdAndDate: (data) =>
    request({
      url: `${baseURL}/findSignedByCourseIdAndDate`,
      method: "GET",
      params: {
        courseId: data.courseId,
        date: data.date,
      },
    }),

  findAbsenceByCourseIdAndDate: (data) =>
    request({
      url: `${baseURL}/findAbsenceByCourseIdAndDate`,
      method: "GET",
      params: {
        courseId: data.courseId,
        date: data.date,
      },
    }),

  updateStatus: (data) =>
    request({
      url: `${baseURL}/updateStatus`,
      method: "POST",
      data: data,
    }),

  deleteByRecordId: (data) =>
    request({
      url: `${baseURL}/deleteByRecordId`,
      method: "POST",
      data: data,
    }),
};
