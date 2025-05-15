"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#e6f5ef] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8">We apologize for the inconvenience. Please try again later.</p>
        <Button onClick={reset} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
          Try again
        </Button>
      </div>
    </div>
  )
}
