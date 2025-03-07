import Link from "next/link"
import { Car, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-white">Zephyrium</span>
            </Link>
            <p className="mb-4 text-sm">
              The smarter way to find your next car. Search, compare, and connect with dealers nationwide.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/buy" className="hover:text-white hover:underline">
                  Buy a Car
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-white hover:underline">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="/finance" className="hover:text-white hover:underline">
                  Car Finance
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white hover:underline">
                  Car Reviews
                </Link>
              </li>
              <li>
                <Link href="/dealers" className="hover:text-white hover:underline">
                  Find Dealers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-white hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white hover:underline">
                  Car Buying Guides
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-white hover:underline">
                  Payment Calculator
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white hover:underline">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-white hover:underline">
                  Advertise With Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Zephyrium. All rights reserved.</p>
            <div className="flex space-x-4 text-sm">
              <Link href="/privacy" className="hover:text-white hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white hover:underline">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-white hover:underline">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

