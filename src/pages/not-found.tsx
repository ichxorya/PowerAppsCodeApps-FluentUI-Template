import { Button, Card, CardHeader, Text, Title1, makeStyles, tokens } from "@fluentui/react-components"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles({
  page: {
    minHeight: "100%",
    display: "grid",
    placeItems: "center",
    ...{ padding: '24px' },
  },
  card: {
    width: "100%",
    maxWidth: "520px",
  },
  content: {
    display: "grid",
    rowGap: "12px",
    ...{ padding: '0 16px 16px 16px' },
  },
  muted: {
    color: tokens.colorNeutralForeground3,
  },
})

export default function NotFoundPage() {
  const styles = useStyles()
  const navigate = useNavigate()

  return (
    <section className={styles.page}>
      <Card className={styles.card}>
        <CardHeader
          header={<Title1>404 - Not found</Title1>}
          description={<Text className={styles.muted}>This is not the page you were looking for.</Text>}
        />
        <div className={styles.content}>
          <Button appearance="primary" onClick={() => navigate("/")}>
            Go home
          </Button>
        </div>
      </Card>
    </section>
  )
}