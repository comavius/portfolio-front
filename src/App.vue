<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import fixedHeader from "./components/FixedHeader.vue";
import MarkdownTitle from "@/components/MarkdownTitle.vue";
import LinkedTag from "@/components/LinkedTag.vue";
import { ColorThemes, ColorTheme } from "@/types/colorTheme";
import { provide, ref } from "vue";

const lightPrimaryTheme = new ColorTheme("#4fc08d", "#ffffff");
const lightSecondaryTheme = new ColorTheme("#000000", "#f3f4f6");
const lightAccentTheme = new ColorTheme("#ff0000", "#f9a8d4");
const lightTheme = new ColorThemes(
  lightPrimaryTheme,
  lightSecondaryTheme,
  lightAccentTheme
);

const darkPrimaryTheme = new ColorTheme("#ffffff", "#22d20");
const darkSecondaryTheme = new ColorTheme("#fadbe4", "#3e1020");
const darkAccentTheme = new ColorTheme("#ff0000", "#000000");
const darkTheme = new ColorThemes(
  darkPrimaryTheme,
  darkSecondaryTheme,
  darkAccentTheme
);
let isDark = false;
const currentTheme = ref(lightTheme);
const toggleTheme = ref(() => {
  isDark = !isDark;
  currentTheme.value = isDark ? darkTheme : lightTheme;
});

provide("theme", currentTheme);
provide("toggleTheme", toggleTheme);

</script>

<template>
  <div class="layout">
    <LinkedTag :link="`/`" name="Home" :style="currentTheme.getSecondary().asHtmlStyle()" />
    <MarkdownTitle :mdbook="{
      title: 'Home',
      description: 'Welcome to my blog!',
      date: '2021-10-01',
      tags: ['tag-1', 'tag-2'],
      emoji: '🏠',
      content: 'This is the home page of my blog. Welcome!',
      alias: 'home',
      license: {
        name: 'CC BY-SA 4.0',
        url: 'https://creativecommons.org/licenses/by-sa/4.0/'
      }
    }" />
    <header>
      <fixedHeader />
    </header>
    <main>
      <RouterView />
    </main>
    <!--
    -->
  </div>
</template>

<style scoped>
/*
header {
  height: 60px;
}

main {
  height: calc(100vh - 60px);
  margin-top: 0;
  padding: 0;
  overflow-y: scroll;
}
.layout {
  display: block;
  margin: 0;
  padding: 0;
}
*/

header {
}

main {
  overflow-y: scroll;
}

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}



.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
