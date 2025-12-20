// types/blog.ts
export interface Blog {
  id: string
  title: string
  nickname: string
  content: string
  image: string
  newsType: number
  author: string
  slug: string
  handle_url: string
  handle_url_title: string
  article_source_url: string
  author_url: string
  tag: string
  createdAt: string
  updatedAt: string
}

export interface BlogFormData {
  title: string
  nickname: string
  content: string
  image: string
  newsType: number
  author: string
  slug: string
  handle_url: string
  handle_url_title: string
  article_source_url: string
  author_url: string
  tag: string
}