import { getEvents } from "@/api/events"
import { getMembers } from "@/api/members"
import { EventCard } from "@/components/event-card"
import { MemberCard } from "@/components/member-card"


export default async function Home() {
  const events = await getEvents()
  const members = await getMembers()

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Membros</h1>
        <div className="flex gap-4">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Eventos</h1>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
