import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import type { MarkdownBook } from '@/types/contentTypes'

import type {RouteRecordRaw} from 'vue-router'

function getBlogsRoute(markdownBook: MarkdownBook): RouteRecordRaw {
  return {
    path: `/blog/${markdownBook.alias}`,
    name: markdownBook.title,
    component: () => import('@/components/MarkdownBook.vue'),
    props: {
      mdbook: markdownBook
    }
  }
}
/*
function getBlogRootRoutes(markdownBooks: MarkdownBook[], rootPath: string): RouteRecordRaw[] {
  return markdownBooks.map((markdownBook) => getBlogsRoute(markdownBook))
}
*/

function getRouter(markdownBooks: MarkdownBook[]) {
  const routes: RouteRecordRaw[] = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
  for (const markdownBook of markdownBooks) {
    routes.push(getBlogsRoute(markdownBook))
    }
    /*
  */
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
  })
}

export default getRouter