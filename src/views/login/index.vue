<template>
  <div class="grid gap-4 p-4">
    <TitleBar title="登录" />

    <div class="px-5 py-6 bg-white rd-3 shadow">
      <!-- 表单 -->
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
        <n-form-item label="学号" path="username">
          <n-input v-model:value="formValue.username" placeholder="输入学号" />
        </n-form-item>

        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="formValue.password"
            placeholder="输入密码(默认密码123456)"
          />
        </n-form-item>
      </n-form>

      <!-- 按钮 -->
      <div class="flex gap-3 justify-end">
        <n-button
          type="primary"
          :disabled="loginButtonDisabled"
          @click="loginHandler"
          >登录</n-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import TitleBar from "../../components/TitleBar.vue";
import studentRequest from "../../api/mothods/student.js";
import router from "../../router";
import { useUserStore } from "../../store/userStore";

const userStore = useUserStore();

const formRef = ref(null); // 表单实例
const formValue = ref({
  // 表单数据
  username: "",
  password: "",
});

// 登录按钮是否禁用
const loginButtonDisabled = computed(() => {
  return !(formValue.value.username && formValue.value.password);
});

// 表单验证规则
const rules = {
  username: [
    { required: true, message: "请输入学号", trigger: "blur" },
    {
      pattern: /^\d{11}$/,
      message: "请输入正确的学号",
      trigger: "blur",
    },
  ],
  password: [{ required: true, message: "请输入验证", trigger: "blur" }],
};

/**
 * 登录
 */
const loginHandler = async () => {
  // 表单验证
  if (!formValue.value.username || !formValue.value.password) return;

  const { data } = await studentRequest.login(formValue.value); // 登录

  if (data.code === 200) {
    userStore.setUser(data.data); // 更新本地用户信息
    window.$message.success("登录成功"); // 提示登录成功
    setTimeout(() => router.back(), 1000); // 1秒后返回上一页

    return;
  }

  window.$message.error("登录失败"); // 提示登录失败
};


onMounted(() => {
});
</script>
