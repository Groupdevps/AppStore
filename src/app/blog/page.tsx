import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Winter Fashion Trends 2025",
    summary: "Stay warm and stylish with this season's top fashion picks.",
    image: "/top5.png",
    slug: "winter-fashion-trends-2025",
  },
  {
    id: 2,
    title: "Sustainable Fabrics You Should Know",
    summary: "Learn about the eco-friendly materials we use in our collections.",
    image: "/ecosystem.png",
    slug: "sustainable-fabrics-guide",
  },
  {
    id: 3,
    title: "Behind the Scenes: Julie’s Design Process",
    summary: "Take a look at how our clothing goes from idea to reality.",
    image: "/behind_scene.png",
    slug: "julie-design-process",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-white px-6 py-12 max-w-6xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Our Blog</h1>
      <p className="text-lg mb-10 max-w-2xl">
        Discover stories, tips, and behind-the-scenes insights from the world of fashion and sustainability.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.summary}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-pink-600 font-medium hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}