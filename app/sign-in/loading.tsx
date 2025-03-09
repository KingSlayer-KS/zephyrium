import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h3 className="text-lg font-medium text-gray-900">Loading...</h3>
        <p className="text-sm text-gray-500">Please wait while we prepare your sign-in page</p>
      </div>
    </div>
  )
}

