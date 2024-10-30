<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { ColorThemes } from '@/types/colorTheme'
import markdownit from 'markdown-it'
import type { MarkdownBook } from '@/types/contentTypes'


// props has mdbook and theme
interface Props {
  mdbook: MarkdownBook
}

const props = defineProps<Props>()

const theme = inject('theme') as ColorThemes

const md = markdownit({
  html: true,
  linkify: true,
})
// replace relative paths of pictures with paths beginning with /public
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  for (let idx2 = 0; idx2 < tokens.length; idx2++) {
    const token = tokens[idx2]
    if (token.attrs && token.attrs[0] && token.attrs[0][0] === 'src') {
      const src = token.attrs[0][1]
      const regex = /\.\.\/pictures\/.*/
      if (regex.test(src)) {
      token.attrs[0][1] = `/public${src.substring(2)}`
      }
    }
    tokens[idx2] = token
  }
  return self.renderToken(tokens, idx, options)
}
const result = md.render(props.mdbook.content)

</script>

<template>
  <div v-html="result" :style=theme.getSecondary().asHtmlStyle()></div>
</template>

<style scoped>
.metainfo {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
</style>
