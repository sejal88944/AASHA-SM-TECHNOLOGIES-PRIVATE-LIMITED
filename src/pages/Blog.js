import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <Seo
        title="SEO Marketing Blog India | SM Tech Solutions Pune"
        description="Read actionable guides on bulk sms service india, whatsapp marketing india, and website growth for small businesses."
        canonicalPath="/blog"
      />
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Digital Marketing Blog</h1>
        <p className="mt-4 text-lg text-slate-600">
          Practical growth content for Indian small businesses focused on SMS, WhatsApp marketing,
          and high-conversion websites.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              <Link to={`/blog/${post.slug}`} className="hover:text-brand">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-brand">Focus keyword: {post.keyword}</p>
            <p className="mt-3 text-slate-600">{post.excerpt}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline"
            >
              Read article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
