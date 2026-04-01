import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components"
import { DesktopRegular, WeatherMoonRegular, WeatherSunnyRegular } from "@fluentui/react-icons"
import { useTheme } from "@/hooks/use-theme"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const icon =
    theme === "light"
      ? <WeatherSunnyRegular />
      : theme === "dark"
        ? <WeatherMoonRegular />
        : <DesktopRegular />

  const label = theme.charAt(0).toUpperCase() + theme.slice(1)

  return (
    <Menu positioning="below-end">
      <MenuTrigger disableButtonEnhancement>
        <Button icon={icon} appearance="subtle">
          Theme: {label}
        </Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem icon={<WeatherSunnyRegular />} onClick={() => setTheme("light")}>
            Light
          </MenuItem>
          <MenuItem icon={<WeatherMoonRegular />} onClick={() => setTheme("dark")}>
            Dark
          </MenuItem>
          <MenuItem icon={<DesktopRegular />} onClick={() => setTheme("system")}>
            System
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}