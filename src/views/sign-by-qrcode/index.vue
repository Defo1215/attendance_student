<template>
  <div>
    <div class="relative h-screen w-screen" v-if="qrcodeVisible">
      <QrcodeStream
        @camera-on="onReady"
        @error="onError"
        @detect="onDetect"
        :paused="paused"
        :track="paintBoundingBox"
      ></QrcodeStream>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 rounded-md z-1000"
      />
    </div>

    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      v-if="signResult !== null"
    >
      <n-result
        status="success"
        title="签到成功"
        description="再接再厉"
        v-if="signResult === 'success'"
      >
        <template #footer>
          <n-button @click="$router.back">返回主页</n-button>
        </template>
      </n-result>
      <n-result
        status="error"
        title="签到失败"
        description="请下课后及时联系老师"
        v-if="signResult === 'fail'"
      >
        <template #footer>
          <n-button @click="$router.back">返回主页</n-button>
        </template>
      </n-result>
      <n-result
        status="warning"
        title="二维码失效"
        description="请返回重新扫码"
        v-if="signResult === 'warning'"
      >
        <template #footer>
          <n-button @click="$router.back">返回主页</n-button>
        </template>
      </n-result>
      <n-result
        status="error"
        title="这不是你的课程"
        description="请不要扫描其他课程的二维码"
        v-if="signResult === 'studentHaveNotThisCourse'"
      >
        <template #footer>
          <n-button @click="$router.back">返回主页</n-button>
        </template>
      </n-result>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import { useUserStore } from "../../store/userStore";
import recordRequest from "../../api/mothods/record.js";
import courseRequest from "../../api/mothods/course.js";
const userStore = useUserStore();

const qrcodeVisible = ref(true);
const result = ref("");
const error = ref("");
const paused = ref(false);
const signResult = ref(null);

// 摄像头准备就绪
const onReady = async (capabilities) => {
  await capabilities;
  window.$message.success("摄像头已准备就绪");
};

// 摄像头异常
const onError = (error) => {
  if (error.name === "StreamApiNotSupportedError") {
    window.$message.error("浏览器不支持摄像头");
  } else if (error.name === "NotAllowedError") {
    window.$message.error("请允许浏览器使用摄像头");
  } else if (error.name === "NotFoundError") {
    window.$message.error("未找到摄像头");
  } else if (error.name === "NotSupportedError") {
    window.$message.error("浏览器不支持摄像头");
  } else if (error.name === "NotReadableError") {
    window.$message.error("摄像头不可读");
  } else if (error.name === "OverconstrainedError") {
    window.$message.error("摄像头无法满足要求");
  } else {
    window.$message.error("摄像头异常");
  }
};

// 二维码识别
const onDetect = async(detectedCodes) => {
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));
  paused.value = true;

  result.value = result.value.replace(/[\[\]"]/g, "");

  const resultList = base64ToChineseString(result.value).split(",");

  console.log(resultList);

  // 二维码失效
  if (parseInt(resultList[8]) < new Date().getTime()) {
    qrcodeVisible.value = false;
    signResult.value = "warning";
    return;
  }

  // 签到表单
  const recordFormData = {
    majorId: resultList[1],
    grade: resultList[2],
    courseId: resultList[4],
    studentId: userStore.user.studentId,
    status: "1",
  };

  const { data } = await courseRequest.checkByCourseIdAndStudentUsername({
    courseId: resultList[4],
    studentUsername: userStore.user.username,
  });

  if (data.code !== 200){
    qrcodeVisible.value = false;
    signResult.value = "studentHaveNotThisCourse";

    return
  }

  signHandler(recordFormData);
};

// 将Base64字符串转换为中文字符串
function base64ToChineseString(base64) {
  try {
    // 使用atob()函数解码Base64字符串并将其存储为二进制数据
    var binaryData = atob(base64);

    // 使用TextDecoder将二进制数据解码为字符串
    var decoder = new TextDecoder("utf-8");
    var textString = decoder.decode(
      new Uint8Array(binaryData.length).map(function (_, i) {
        return binaryData.charCodeAt(i);
      })
    );
    return textString;
  } catch (error) {
    console.error("解码时出现错误：" + error);
    return null;
  }
}

// 绘制边框
const paintBoundingBox = (detectedCodes, ctx) => {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#007bff";
    ctx.strokeRect(x, y, width, height);

    console.log(ctx)
    console.log(detectedCode)
  }
};

// 检查学生是否有该课程
const checkCourseByCourseIdAndStudentUsername = async(formData) => {
  const { data } = await recordRequest.checkCourseByCourseIdAndStudentUsername(formData);

  if (data.code !== 200){
    qrcodeVisible.value = false;
    signResult.value = "studentHaveNotThisCourse";
  }
}

// 签到
const signHandler = async (recordFormData) => {
  const { data } = await recordRequest.save(recordFormData);

  if (data.code === 200) {
    qrcodeVisible.value = false;
    signResult.value = "success";
  } else {
    qrcodeVisible.value = false;
    signResult.value = "fail";
  }
};


// outline outline-999 outline-white/60
onMounted(() => {});
</script>
