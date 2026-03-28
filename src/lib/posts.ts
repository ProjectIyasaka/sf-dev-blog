import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export type Post = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: string
  content: string
  affiliate?: string
}

export function getAllPosts(): Omit<Post, 'content'>[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((f) => f.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags ?? [],
        readingTime: readingTime(content).text,
        affiliate: data.affiliate,
      }
    })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
    content,
    affiliate: data.affiliate,
  }
}
