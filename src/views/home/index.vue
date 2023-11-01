<template>
  <div>
    <div class="p-4">
      <title-bar class="mb-4" title="签到"/>
      
      <sign-method-box :content-list="signMethodBoxContent" @click="signMethodBoxClickHandler"/>
    </div>
  </div>
</template>

<script setup>
import TitleBar from '../../components/TitleBar.vue';
import SignMethodBox from './components/SignMethodBox.vue';
import router from '../../router';

// 签到方法列表
const signMethodBoxContent = [
  {
    title: "扫码签到",
    desc: "使用扫描二维码的方式进行签到",
    icon: "i-carbon-qr-code",
    path: "/sign-by-qrcode",
  },
  {
    title: "位置签到",
    desc: "使用定位的方式进行签到",
    icon: "i-carbon-location",
  },
  // {
  //   title: "拍照签到",
  //   desc: "使用拍照的方式进行签到",
  //   icon: "i-carbon-camera",
  // },
  // {
  //   title: "二维码签到",
  //   desc: "使用二维码的方式进行签到",
  //   icon: "i-carbon-qr-code",
  // },
  // {
  //   title: "指静脉签到",
  //   desc: "使用指静脉识别的方式进行签到",
  //   icon: "i-carbon-fingerprint-recognition",
  // },
]

/**
 * 签到方法列表点击事件
 * @param {*} index 点击的索引
 */
const signMethodBoxClickHandler = (index) => {
  router.push(signMethodBoxContent[index].path)
}
</script>
