<script setup lang="ts">
import { NSwitch } from 'naive-ui';
import { onUnmounted, watch } from 'vue';
import { globalConfig } from './storage';
import { setAchievementVisibility } from './util';
import FloatIcon from './components/FloatIcon.vue';

window.setTimeout(() => {
  watch(
    () => globalConfig.achievementVisibility,
    () => {
      setAchievementVisibility(!globalConfig.achievementVisibility);
    },
    { immediate: true }
  );
}, 1000);
</script>

<template>
  <div class="root-1fdb449b">
    <div class="title">原神Wiki辅助工具</div>
    <NSwitch v-model:value="globalConfig.achievementVisibility">
      <template #checked> 已完成成就-隐藏中 </template>
      <template #unchecked> 已完成成就-显示中 </template>
    </NSwitch>
    <div>
      更多功能请在
      <a href="https://github.com/lisonge/op-wiki-plus/issues" target="_blank">
        issues
      </a>
      提出
    </div>
    <FloatIcon />
  </div>
</template>

<style scoped lang="scss">
.root-1fdb449b {
  color: black;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: flex-start;
  & > * {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
