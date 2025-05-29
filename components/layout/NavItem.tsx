"use client"

import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItemProps {
  icon: LucideIcon
  label: string
  href?: string
  active?: boolean
  onClick?: () => void
}

export function NavItem({ icon: Icon, label, href = "#", active = false, onClick }: NavItemProps) {
  return (
    <a href={href} onClick={onClick}>
      <Button
        variant="ghost"
        className={`w-full justify-start text-sm ${
          active ? "bg-slate-800/70 text-orange-400" : "text-slate-400 hover:text-slate-100"
        }`}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </a>
  )
}
