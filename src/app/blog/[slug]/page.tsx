import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import AffiliateCard from '@/components/AffiliateCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  return {
    title: post.title + ' | SF Dev Blog',
    description: post.description,
  }
}

const components = {
  AffiliateCard,
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-8 block">
        ← 記事一覧
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <div className="text-sm text-gray-400 mb-10">
        {post.date} · {post.readingTime}
      </div>

      <article className="prose prose-gray max-w-none">
        <MDXRemote source={post.content} components={components} />
      </article>
    </main>
  )
}
