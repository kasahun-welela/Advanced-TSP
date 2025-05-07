import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-[80%] mx-auto  py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Details */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold">E-learning</h3>
            <p className="text-gray-400 md:text-xl">
              Top learning experiences that create more talent in the world.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Email</span>
                <svg
                  className="h-6 w-6 md:h-8 md:w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Phone</span>
                <svg
                  className="h-6 w-6 md:h-8 md:w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold">Products</h3>
            <ul className="space-y-2 md:text-xl">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Product 1
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Product 2
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Product 3
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Product 4
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold">Company</h3>
            <ul className="space-y-2 md:text-xl">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold">Follow Us</h3>
            <ul className="space-y-2 md:text-xl">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Telegram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold">Legal</h3>
            <ul className="space-y-2 md:text-xl">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
