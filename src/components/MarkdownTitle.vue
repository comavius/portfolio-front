<script setup lang="ts">
import { defineProps, inject } from "vue";
import { ColorThemes } from "@/types/colorTheme";
import type { MarkdownBook } from "@/types/contentTypes";
import LinkedTag from "@/components/LinkedTag.vue";
// props has mdbook and theme
interface Props {
  mdbook: MarkdownBook;
}

const props = defineProps<Props>();

const theme = inject("theme") as ColorThemes;
</script>

<template>
  <div :style="theme.getPrimary().asHtmlStyle()">
    <div :style="theme.getSecondary().colorAsHtmlStyle()">
      <p>{{ props.mdbook.date }}</p>
    </div>
    <h1>{{ `${props.mdbook.emoji} ${props.mdbook.title}` }}</h1>
    <div :style="theme.getSecondary().colorAsHtmlStyle()">
      <p>{{ props.mdbook.description }}</p>
    </div>
    <div class=tags :style="theme.getAccent().colorAsHtmlStyle()">
        <div v-for="tag in props.mdbook.tags" :key="tag">
          <LinkedTag :name="'#'+tag" :style="theme.getAccent().colorAsHtmlStyle()" />
        </div>
    </div>
  </div>
</template>

<style scoped>
.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
