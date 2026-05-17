import { getEventById } from "@/api/events"
import { MemberCard } from "@/components/member-card"
import { CalendarDays, MapPin, Users } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await getEventById(id)

  if (!event) notFound()

  const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={event.coverImageUrl}
          alt={`Capa do evento ${event.title}`}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-zinc-800">{event.title}</h1>

        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4 shrink-0" />
            {formattedDate}
          </span>

          {event.location?.name && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0" />
              {event.location.name}, {event.location.city} — {event.location.state}
            </span>
          )}

          <span className="flex items-center gap-1.5">
            <Users className="size-4 shrink-0" />
            {event.attendances.length} presença{event.attendances.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {event.description && (
        <p className="text-zinc-600 text-sm leading-relaxed whitespace-break-spaces">{event.description}</p>
      )}

      {event.attendances.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-zinc-700">Presenças</h2>
          <div className="grid grid-cols-5 gap-4">
            {event.attendances.map((attendance) => (
              <MemberCard key={attendance.id} member={attendance.member} />
            ))}
          </div>
        </section>
      )}

      {event.photos.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-zinc-700">Fotos</h2>
          <div className="grid grid-cols-3 gap-3">
            {event.photos.map((photo) => (
              <div key={photo.id} className="relative aspect-square overflow-hidden">
                <Image
                  src={photo.url}
                  alt="Foto do evento"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
