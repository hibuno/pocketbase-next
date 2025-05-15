import LoadingSpinner from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#e6f5ef] flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner className="h-12 w-12 mx-auto" />
        <p className="mt-4 text-gray-600">Loading content...</p>
      </div>
    </div>
  )
}
