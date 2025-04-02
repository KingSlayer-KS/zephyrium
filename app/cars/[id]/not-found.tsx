import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"

export default function CarNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <Car className="h-16 w-16 text-primary mb-4" />
      <h1 className="text-4xl font-bold mb-2">Car Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't find the car you're looking for. It may have been sold or removed from our listings.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/cars">Browse All Cars</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}

