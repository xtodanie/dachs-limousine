"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle({ className, iconClassName }: { className?: string, iconClassName?: string }) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={className}
      aria-label="Toggle theme"
    >
      <Sun className={`h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${iconClassName}`} />
      <Moon className={`absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${iconClassName}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
