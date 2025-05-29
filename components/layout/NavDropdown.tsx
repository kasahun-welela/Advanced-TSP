"use client"

import { useState } from "react"
import { LucideIcon, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavDropdownProps {
  icon: LucideIcon
  label: string
  children: React.ReactNode
}

export function NavDropdown({ icon: Icon, label, children }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-gray-800 hover:text-green-600"
      >
        <div className="flex items-center">
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-green-600" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </Button>

      {isOpen && <div className="ml-6 mt-1 space-y-2">{children}</div>}
    </div>
  )
}
