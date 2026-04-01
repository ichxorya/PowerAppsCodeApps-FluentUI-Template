import { type ReactNode } from "react"
import { Toaster } from "sonner"
import { useTheme } from "@/hooks/use-theme"

type SonnerProviderProps = { children: ReactNode }

export function SonnerProvider({ children }: SonnerProviderProps) {
  const { resolvedTheme } = useTheme()

  return (
    <>
      {children}
      <Toaster
        position="top-center"
        theme={resolvedTheme}
        richColors
        expand
        duration={3000}
        visibleToasts={3}
      />
    </>
  )
}