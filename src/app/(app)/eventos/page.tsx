import { getEvents } from "@/api/events"
import { EventCard } from "@/components/event-card"

export default async function EventosPage() {
  const events = await getEvents()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Eventos</h1>
      <div className="flex flex-col gap-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
