<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
interface Props {
  link?: string;
  name: string;
}

const props = defineProps<Props>();

</script>

<template>
  <div class="tagbox">
    <div v-if="props.link">
      <router-link :to="props.link">{{ props.name }}</router-link>
    </div>
      <div v-else>
      {{ props.name }}
    </div>
  </div>
</template>

<style scoped>
.tagbox {
  display: inline-block;
  transition: background-color 0.3s;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  size: 1rem;
  font-weight: bold;
}
.tagbox-link {
  cursor: pointer;
}
</style>
