import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-2">SF Dev Blog</h1>
        <p className="text-gray-500">
          Salesforce開発者向け技術情報・Apex・LWC・インテグレーション
        </p>
      </header>

      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
          最新記事
        </h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-6">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-xl font-semibold hover:text-blue-600 transition mb-1">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-500 text-sm mb-2">{post.description}</p>
              <div className="text-xs text-gray-400">
                {post.date} · {post.readingTime}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
