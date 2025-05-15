"use server"

import { getPocketBase, type Post, getImageUrl } from "./pocketbase"

// Fetch all posts with optional sorting and filtering
export async function getPosts(options?: {
  page?: number
  perPage?: number
  sort?: string
  filter?: string
  expand?: string
}) {
  try {
    const pb = getPocketBase()
    const { page = 1, perPage = 10, sort = "-created", filter = "", expand = "author" } = options || {}

    const resultList = await pb.collection("posts").getList(page, perPage, {
      sort,
      filter,
      expand,
    })

    // Process the posts to add full URLs for cover images
    const processedPosts = resultList.items.map((post: Post) => {
      if (post.cover) {
        const coverUrl = getImageUrl(pb, post.collectionId, post.id, post.cover)
        return { ...post, coverUrl }
      }
      return post
    })

    return {
      ...resultList,
      items: processedPosts,
    }
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw new Error("Failed to fetch posts")
  }
}

// Fetch a single post by ID
export async function getPost(id: string) {
  try {
    const pb = getPocketBase()
    const post = await pb.collection("posts").getOne(id, {
      expand: "author",
    })

    // Add full URL for cover image
    if (post.cover) {
      const coverUrl = getImageUrl(pb, post.collectionId, post.id, post.cover)
      return { ...post, coverUrl }
    }

    return post
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error)
    throw new Error("Failed to fetch post")
  }
}

// Fetch featured post (could be the most recent or a specifically marked one)
export async function getFeaturedPost() {
  try {
    const result = await getPosts({
      perPage: 1,
      sort: "-created",
    })

    return result.items[0] || null
  } catch (error) {
    console.error("Error fetching featured post:", error)
    throw new Error("Failed to fetch featured post")
  }
}

// Fetch latest posts excluding the featured one
export async function getLatestPosts(featuredPostId?: string, limit = 4) {
  try {
    let filter = ""
    if (featuredPostId) {
      filter = `id != "${featuredPostId}"`
    }

    const result = await getPosts({
      perPage: limit,
      sort: "-created",
      filter,
    })

    return result.items
  } catch (error) {
    console.error("Error fetching latest posts:", error)
    throw new Error("Failed to fetch latest posts")
  }
}

// Fetch related posts (posts with similar content, for now just other recent posts)
export async function getRelatedPosts(currentPostId: string, limit = 2) {
  try {
    const filter = `id != "${currentPostId}"`

    const result = await getPosts({
      perPage: limit,
      sort: "-created",
      filter,
    })

    return result.items
  } catch (error) {
    console.error("Error fetching related posts:", error)
    throw new Error("Failed to fetch related posts")
  }
}
