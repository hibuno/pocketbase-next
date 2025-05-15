import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getFeaturedPost, getLatestPosts } from "@/lib/actions"
import { formatDate } from "@/lib/utils"

export default async function Home() {
  // Fetch the featured post (most recent)
  const featuredPost = await getFeaturedPost()

  // Fetch latest posts excluding the featured one
  const latestPosts = await getLatestPosts(featuredPost?.id, 4)

  return (
    <div className="min-h-screen bg-[#e6f5ef]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="espira" width={100} height={30} className="h-7 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/blog" className="text-sm font-medium text-gray-900 hover:text-gray-600">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-900 hover:text-gray-600">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-900 hover:text-gray-600">
              Contact
            </Link>
          </nav>
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 text-sm">
            Get Started
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                News, tips and insights from our team of experts.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Learn about natural medicinal cannabis and how it can improve your health and wellbeing.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredPost && (
          <section className="pb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <Image
                      src={featuredPost.coverUrl || `/placeholder.svg?height=400&width=600`}
                      alt={featuredPost.title}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8 md:w-1/2">
                    <div className="uppercase tracking-wide text-sm text-green-600 font-semibold mb-1">Featured</div>
                    <Link href={`/blog/${featuredPost.id}`} className="block">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                        {featuredPost.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>{formatDate(featuredPost.created)}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredPost.expand?.author?.name || "Anonymous"}</span>
                    </div>
                    <Link
                      href={`/blog/${featuredPost.id}`}
                      className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
                    >
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest Articles */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {latestPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm transition-transform hover:translate-y-[-4px]"
                  >
                    <Image
                      src={post.coverUrl || `/placeholder.svg?height=300&width=600`}
                      alt={post.title}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <Link href={`/blog/${post.id}`} className="block">
                        <h3 className="font-bold text-xl mb-3 hover:text-green-600 transition-colors">{post.title}</h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{formatDate(post.created)}</span>
                          <span className="mx-2">•</span>
                          <span>{post.expand?.author?.name || "Anonymous"}</span>
                        </div>
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-green-600 text-sm font-medium hover:text-green-700"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button
                  asChild
                  className="bg-white hover:bg-gray-50 text-green-600 border border-green-600 rounded-full px-8 py-2"
                >
                  <Link href="/blog">View all articles</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#e6f5ef] rounded-xl p-8 md:p-12">
                <div className="md:flex items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      Possible applications of the therapy
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Cannabis can be used to treat a variety of conditions, including chronic pain, anxiety, as well as
                      neurological disorders.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">Learn more</Button>
                  </div>
                  <div className="md:w-1/3">
                    <Image
                      src="/therapy-applications.jpg"
                      alt="Therapy applications"
                      width={300}
                      height={300}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a3a3a] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="mb-8 md:mb-0">
                <Image src="/logo-white.svg" alt="espira" width={100} height={30} className="h-7 w-auto mb-4" />
                <p className="text-gray-300 text-sm max-w-xs">
                  Dedicated to providing natural and effective cannabis-based treatments for patients in need.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-medium mb-4 text-sm">Navigation</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>
                      <Link href="/" className="hover:text-white">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="hover:text-white">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="hover:text-white">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-white">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-4 text-sm">Legal</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>
                      <Link href="/privacy" className="hover:text-white">
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="hover:text-white">
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link href="/cookies" className="hover:text-white">
                        Cookies
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-4 text-sm">Contact</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>info@espira.com</li>
                    <li>123 Green Street</li>
                    <li>New York, NY 10001</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2023 espira. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
