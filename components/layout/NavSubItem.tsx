"use client"

import Link from "next/link"

interface NavSubItemProps {
  label: string
  href: string
}

export function NavSubItem({ label, href }: NavSubItemProps) {
  const formattedHref = href.startsWith("/") ? href : `/${href}`

  return (
    <Link
      href={formattedHref}
      className="block px-3 py-2 rounded-md bg-gray-100 text-sm text-gray-800 hover:bg-orange-100 hover:text-green-600 transition-all duration-200"
    >
      {label}
    </Link>
  )
}
