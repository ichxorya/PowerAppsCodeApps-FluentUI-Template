import {
  FluentProvider,
  teamsDarkTheme,
  teamsLightTheme,
  type Theme as FluentTheme,
} from "@fluentui/react-components"
import { createContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => undefined,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

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
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") {
      return "light"
    }

    return theme === "system" ? getSystemTheme() : theme
  })

  useEffect(() => {
    if (theme !== "system") {
      setResolvedTheme(theme)
      return
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const syncTheme = () => {
      setResolvedTheme(mediaQuery.matches ? "dark" : "light")
    }

    syncTheme()
    mediaQuery.addEventListener("change", syncTheme)

    return () => {
      mediaQuery.removeEventListener("change", syncTheme)
    }
  }, [theme])

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