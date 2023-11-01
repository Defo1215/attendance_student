<template>
  <div class="grid grid-row-1 gap-3">
    <div
      class="flex item-center p-4 w-full bg-white border rounded-md shadow-sm"
      v-for="(data, index) in props.contentList"
      :key="index"
      @click="emit('click', index)"
    >
      <div
        class="translate-y-0.7 mr-2 text-6 text-green-6"
        :class="[data.icon]"
        :style="{ color: data.iconColor }"
      />
      <div>
        <div class="text-5 font-fold">{{ data.title }}</div>
        <div class="text-3.5 text-gray-400">{{ data.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(["click"]);

const props = defineProps({
  /**
   * 签到方式列表
   * @type {Array}
   * @example
   * [
   *  {
   *    title: "普通签到",
   *    desc: "使用手动输入学号的方式进行签到",
   *    icon: "i-carbon-checkbox-checked",
   *    iconColor: "#000"
   *  }
   * ]
   */
  contentList: Array,
});

</script>
