<script setup lang="ts">
import { defineProps, inject } from "vue";
import { ColorThemes } from "@/types/colorTheme";
import type { MarkdownBook } from "@/types/contentTypes";

// props has mdbook and theme
interface Props {
  mdbook: MarkdownBook;
}

const props = defineProps<Props>();

const theme = inject("theme") as ColorThemes;
</script>

<template>
  <div :style="theme.getPrimary().asHtmlStyle()">
    <h1>{{ `${props.mdbook.emoji} ${props.mdbook.title}` }}</h1>
    <div :style="theme.getSecondary().colorAsHtmlStyle()">
        <p>{{ props.mdbook.description }}</p>
        <p>{{ props.mdbook.date }}</p>
    </div>
    <div :style="theme.getAccent().colorAsHtmlStyle()">
        <div v-for="tag in props.mdbook.tags" :key="tag">
            <span>{{ tag }}</span>
        </div>
    </div>
  </div>
</template>

<style scoped></style>
