<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import { ColorThemes } from '@/types/colorTheme'
const theme = inject('theme') as Ref<ColorThemes>
const toggleTheme = inject('toggleTheme') as Ref<() => void>
</script>

<template>
  <header class="fixed-header" :style=theme.getPrimary().asHtmlStyle()>
    <h1>Fixed Header</h1>
    <button @click="toggleTheme">Toggle Theme</button>
  </header>
</template>

<style scoped>
.fixed-header {
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  text-align: center;
}
</style>
