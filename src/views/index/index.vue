<template>
  <div>
    <div @scroll="handleContainerScroll" h-100vh overflow-auto>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
    <!-- 底部tabbar -->
    <div
      class="fixed bottom-0 w-full p-3 transition-all duration-300 z-10"
      :class="tabbarVisible ? 'translate-y-0' : 'translate-y-100'"
    >
      <Tabbar :tabsContent="tabsContent" />
    </div>
  </div>
</template>

<script setup>
import Tabbar from "../../components/Tabbar.vue";

const tabsContent = [
  {
    text: "签到",
    icon: "i-carbon-checkbox-checked",
    path: "/",
  },
  {
    text: "我的",
    icon: "i-ic:outline-person-outline",
    path: "/user",
  },
];

// 是否显示底部tabbar
const tabbarVisible = ref(true);
let oldScrollTop = 0; //上一次滚动的距离

/**
 * 监听滚动事件，控制tabbar的显示与隐藏
 * @param {*} event
 */
const handleContainerScroll = (event) => {
  console.log(event.target);
  if (!event.target) return;
  const curScrollTop = event.target.scrollTop;
  tabbarVisible.value = curScrollTop < oldScrollTop;
  oldScrollTop = curScrollTop;
};
</script>
