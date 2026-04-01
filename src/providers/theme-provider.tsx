import {
  FluentProvider,
  teamsDarkTheme,
  teamsLightTheme,
  type Theme as FluentTheme,
} from "@fluentui/react-components"
import { useEffect, useMemo, useState, type ReactNode } from "react"
import { ThemeProviderContext, type ResolvedTheme, type Theme } from "./theme-context"

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "app-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") {
      return "light"
    }

    return getSystemTheme()
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (nextTheme: Theme) => {
        localStorage.setItem(storageKey, nextTheme)
        setTheme(nextTheme)
      },
    }),
    [resolvedTheme, storageKey, theme]
  )

  const fluentTheme: FluentTheme =
    resolvedTheme === "dark" ? teamsDarkTheme : teamsLightTheme

  return (
    <ThemeProviderContext.Provider value={value}>
      <FluentProvider theme={fluentTheme}>{children}</FluentProvider>
    </ThemeProviderContext.Provider>
  )
}