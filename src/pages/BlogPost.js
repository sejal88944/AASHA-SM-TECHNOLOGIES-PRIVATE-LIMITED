import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { blogPosts } from "../data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <Seo
        title={`${post.title} | SM Tech Solutions`}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
      />
      <Link to="/blog" className="text-sm font-medium text-brand hover:underline">
        ← Back to Blog
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">{post.title}</h1>
      <p className="mt-2 text-sm text-brand">Primary keyword: {post.keyword}</p>
      <div className="mt-8 space-y-5 text-slate-700 leading-relaxed">
        {post.content.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Need help implementing this?</h2>
        <p className="mt-2 text-slate-600">
          Our Pune team can set up complete campaigns and conversion-focused landing pages.
        </p>
        <Link
          to="/contact"
          className="mt-4 inline-flex rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Contact Now
        </Link>
      </div>
    </article>
  );
}
