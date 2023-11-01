import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  persist: true,

  state: () => ({
    user: {
      id: "", //用户id
      studentId: "", //学号
      studentName: "", //学生姓名
      majorId: "", //专业id
      major: "", //专业名称
      grade: "", //年级
      class: "", //班级
      gender: "", //性别
      username: "", //用户名
      token: "", //token
    },
  }),

  actions: {
    setUser(user) {
      this.user = user;
    },

    update(user) {
      //根据user对象的key更新user对应的值
      for (let key in user) {
        this.user[key] = user[key];
      }
    },

    //清空user
    clear() {
      this.user = {
        id: "",
        username: "",
        password: "",
        name: "",
      };
    },
  },
});
