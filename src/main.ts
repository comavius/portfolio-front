import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import getRouter from '@/router'

import type { MarkdownBook } from '@/types/contentTypes'

const dummyBooks: MarkdownBook[] = [
    {
        title: 'Dummy Book',
        alias: 'dummy-book',
        emoji: '📖',
        content: `# Title
## Subtitle
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
![dummy](../pictures/rye.png)
        `,
        license: {
        name: 'MIT'
        },
        tags: ['dummy'],
        date: '2021-01-01'
    }
]

const router = getRouter(dummyBooks)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
