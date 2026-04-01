import { useState } from "react"
import {
  Badge,
  Body1,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Link,
  ProgressBar,
  Subtitle1,
  Title1,
  makeStyles,
  tokens,
} from "@fluentui/react-components"
import powerAppsLogo from "/power-apps.svg"
import reactLogo from "@/assets/react.svg"
import { ModeToggle } from "@/components/mode-toggle"
import { toast } from "sonner"

const useStyles = makeStyles({
  page: {
    minHeight: "100%",
    display: "grid",
    alignItems: "center",
    ...{ padding: '30px 20px' },
  },
  shell: {
    width: "100%",
    maxWidth: "1040px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "grid",
    rowGap: "20px",
  },
  hero: {
    display: "grid",
    rowGap: "8px",
  },
  mutedText: {
    color: tokens.colorNeutralForeground3,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  logoLink: {
    display: "inline-flex",
    textDecorationLine: "none",
    ...{ padding: '6px' },
    ...{ borderRadius: tokens.borderRadiusLarge },
    ...{ border: `1px solid ${tokens.colorNeutralStroke2}` },
    transitionProperty: "transform, box-shadow",
    transitionDuration: "180ms",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow16,
    },
  },
  logo: {
    height: "72px",
    width: "72px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
  cardBody: {
    display: "grid",
    rowGap: "14px",
    ...{ padding: '0 16px 16px 16px' },
  },
  actionRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    "@media (max-width: 700px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
})

export default function HomePage() {
  const styles = useStyles()
  const [count, setCount] = useState(0)
  const [command, setCommand] = useState("")

  const completion = Math.min(count / 12, 1)

  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.hero}>
          <Badge appearance="tint" color="brand" size="large">
            Fluent UI v9 Starter
          </Badge>
          <Title1>Power + Code with a Fluent Microsoft vibe</Title1>
          <Body1 className={styles.mutedText}>
            The UI now uses Fluent components, Teams-inspired theming, and a cleaner Windows-style layout.
          </Body1>
        </div>

        <div className={styles.logoRow}>
          <Link
            href="https://github.com/microsoft/PowerAppsCodeApps"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.logoLink}
          >
            <img src={powerAppsLogo} className={styles.logo} alt="Power Apps logo" />
          </Link>
          <Link
            href="https://react.dev"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.logoLink}
          >
            <img src={reactLogo} className={styles.logo} alt="React logo" />
          </Link>
        </div>

        <div className={styles.cards}>
          <Card>
            <CardHeader
              header={<Subtitle1>Counter telemetry</Subtitle1>}
              description={<Body1 className={styles.mutedText}>Keep score and visualize progress.</Body1>}
            />
            <div className={styles.cardBody}>
              <Body1>Count is {count}</Body1>
              <ProgressBar value={completion} />
              <div className={styles.actionRow}>
                <Button appearance="primary" onClick={() => setCount((value) => value + 1)}>
                  Increment
                </Button>
                <Button appearance="secondary" onClick={() => setCount(0)}>
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              header={<Subtitle1>Command center</Subtitle1>}
              description={<Body1 className={styles.mutedText}>Draft quick actions and trigger toast feedback.</Body1>}
            />
            <div className={styles.cardBody}>
              <Field label="Command" hint="Try: sync workspace">
                <Input
                  value={command}
                  onChange={(_, data) => setCommand(data.value)}
                  placeholder="Type command text"
                />
              </Field>
              <div className={styles.actionRow}>
                <Button
                  appearance="primary"
                  onClick={() => toast.info(command ? `Queued: ${command}` : "Hello from Fluent UI")}
                >
                  Send toast
                </Button>
                <Button appearance="subtle" onClick={() => setCommand("")}>
                  Clear
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.footer}>
          <ModeToggle />
          <Body1 className={styles.mutedText}>
            Edit src/pages/home.tsx and save to test HMR.
          </Body1>
        </div>
      </div>
    </section>
  )
}