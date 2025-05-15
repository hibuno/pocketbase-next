import PocketBase from "pocketbase"

// Create a singleton instance of PocketBase
let pb: PocketBase | null = null

export function getPocketBase() {
  if (!pb) {
    // Initialize PocketBase with the API URL
    // In production, you would use an environment variable for the URL
    pb = new PocketBase("http://127.0.0.1:8090")
  }
  return pb
}

// Post type definition based on the API response
export interface Post {
  id: string
  collectionId: string
  collectionName: string
  author: string
  title: string
  excerpt: string
  cover: string
  content: string
  created: string
  updated: string
  expand?: {
    author?: User
  }
}

// User type definition based on the API response
export interface User {
  id: string
  collectionId: string
  collectionName: string
  email: string
  emailVisibility: boolean
  verified: boolean
  name: string
  avatar: string
  created: string
  updated: string
}

// Helper function to get the full image URL
export function getImageUrl(pb: PocketBase, collectionId: string, recordId: string, filename: string) {
  return `${pb.baseUrl}/api/files/${collectionId}/${recordId}/${filename}`
}
