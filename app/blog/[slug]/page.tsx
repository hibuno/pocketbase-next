import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPost, getRelatedPosts } from "@/lib/actions";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function BlogPost({
 params,
}: {
 params: Promise<{ slug: string }>;
}) {
 try {
  // Fetch the post data
  const post = await getPost((await params).slug);

  // Fetch related posts
  const relatedPosts = await getRelatedPosts((await params).slug, 2);

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
   <div className="min-h-screen bg-[#e6f5ef]">
    {/* Header */}
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
     <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center">
       <Image
        src="/logo.svg"
        alt="espira"
        width={100}
        height={30}
        className="h-7 w-auto"
       />
      </Link>
      <nav className="hidden md:flex space-x-6">
       <Link
        href="/blog"
        className="text-sm font-medium text-gray-900 hover:text-gray-600"
       >
        Blog
       </Link>
       <Link
        href="/about"
        className="text-sm font-medium text-gray-900 hover:text-gray-600"
       >
        About
       </Link>
       <Link
        href="/contact"
        className="text-sm font-medium text-gray-900 hover:text-gray-600"
       >
        Contact
       </Link>
      </nav>
      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 text-sm">
       Get Started
      </Button>
     </div>
    </header>

    {/* Main Content */}
    <main className="py-12">
     <article className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
       {/* Article Header */}
       <div className="mb-8">
        <Link
         href="/blog"
         className="text-green-600 hover:text-green-700 text-sm font-medium mb-4 inline-block"
        >
         ← Back to articles
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
         {post.title}
        </h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
         <span>{formatDate(post.created)}</span>
         <span className="mx-2">•</span>
         <span>{readingTime} min read</span>
         {post.expand?.author && (
          <>
           <span className="mx-2">•</span>
           <span>By {post.expand.author.name}</span>
          </>
         )}
        </div>
        <div className="border-b border-gray-200 pb-8">
         <Image
          src={post.coverUrl || `/placeholder.svg?height=600&width=1200`}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full h-auto rounded-xl"
         />
        </div>
       </div>

       {/* Article Content */}
       <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
         {post.excerpt}
        </p>

        {/* Render the content - in a real app, you might want to use a markdown renderer */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
       </div>

       {/* Article Footer */}
       <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
         <div className="mb-4 md:mb-0">
          <span className="text-sm text-gray-500">Share this article:</span>
          <div className="flex space-x-4 mt-2">
           <Link href="#" className="text-gray-400 hover:text-gray-600">
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
           <Link href="#" className="text-gray-400 hover:text-gray-600">
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
           <Link href="#" className="text-gray-400 hover:text-gray-600">
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
             <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
             <rect width="4" height="12" x="2" y="9" />
             <circle cx="4" cy="4" r="2" />
            </svg>
           </Link>
          </div>
         </div>
         <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
          Subscribe to our newsletter
         </Button>
        </div>
       </div>

       {/* Related Articles */}
       {relatedPosts.length > 0 && (
        <div className="mt-16">
         <h3 className="text-xl font-bold mb-6">Related Articles</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPosts.map((relatedPost) => (
           <div
            key={relatedPost.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm"
           >
            <div className="p-6">
             <Link href={`/blog/${relatedPost.id}`} className="block">
              <h4 className="font-bold text-lg mb-2 hover:text-green-600 transition-colors">
               {relatedPost.title}
              </h4>
             </Link>
             <p className="text-gray-600 text-sm mb-3">{relatedPost.excerpt}</p>
             <div className="flex items-center text-xs text-gray-500">
              <span>{formatDate(relatedPost.created)}</span>
              <span className="mx-2">•</span>
              <span>{relatedPost.expand?.author?.name || "Anonymous"}</span>
             </div>
            </div>
           </div>
          ))}
         </div>
        </div>
       )}
      </div>
     </article>
    </main>

    {/* Footer */}
    <footer className="bg-[#0a3a3a] text-white py-12">
     <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="mb-8 md:mb-0">
         <Image
          src="/logo-white.svg"
          alt="espira"
          width={100}
          height={30}
          className="h-7 w-auto mb-4"
         />
         <p className="text-gray-300 text-sm max-w-xs">
          Dedicated to providing natural and effective cannabis-based treatments
          for patients in need.
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
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
         © 2023 espira. All rights reserved.
        </p>
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
  );
 } catch (error) {
  console.error("Error fetching blog post:", error);
  notFound();
 }
}
