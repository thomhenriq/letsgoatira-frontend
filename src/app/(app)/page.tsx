import { getEvents } from "@/api/events"

export default async function Home() {
  const events = await getEvents()

  return (
    <div>
      home
      <pre>
        {JSON.stringify(events, null ,2)}
      </pre>
    </div>
  )
}