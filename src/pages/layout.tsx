import { Outlet, NavLink } from "react-router-dom"
import { Body1Strong, Button, makeStyles, tokens } from "@fluentui/react-components"
import { GridDotsRegular } from "@fluentui/react-icons"
import { ModeToggle } from "@/components/mode-toggle"

type LayoutProps = { showHeader?: boolean }

const useStyles = makeStyles({
  root: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  header: {
    ...{ borderBottom: "1px solid ${tokens.colorNeutralStroke2}" },
    backgroundColor: tokens.colorNeutralBackground1,
    backdropFilter: "blur(14px)",
  },
  headerInner: {
    height: "56px",
    width: "100%",
    maxWidth: "1120px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...{ padding: '0 20px' },
  },
  brand: {
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
  },
  brandBadge: {
    height: "28px",
    width: "28px",
    display: "grid",
    placeItems: "center",
    ...{ borderRadius: tokens.borderRadiusMedium },
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
  },
  navLink: {
    textDecorationLine: "none",
  },
  main: {
    flexGrow: 1,
    display: "flex",
  },
  mainInner: {
    flexGrow: 1,
    width: "100%",
    maxWidth: "1120px",
    marginLeft: "auto",
    marginRight: "auto",
  },
})

export default function Layout({ showHeader = true }: LayoutProps) {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.brand}>
              <span className={styles.brandBadge}>
                <GridDotsRegular />
              </span>
              <Body1Strong>Power + Code</Body1Strong>
            </div>

            <nav className={styles.nav}>
              <NavLink to="/" end className={styles.navLink}>
                {({ isActive }) => (
                  <Button appearance={isActive ? "primary" : "subtle"} size="small">
                    Home
                  </Button>
                )}
              </NavLink>
              <ModeToggle />
            </nav>
          </div>
        </header>
      )}

      <main className={styles.main}>
        <div className={styles.mainInner}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}