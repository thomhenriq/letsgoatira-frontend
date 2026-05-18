import { getEventById } from "@/api/events"
import { getMembers } from "@/api/members"
import { AddAttendancesDialog } from "@/components/add-attendances-dialog"
import { MemberCard } from "@/components/member-card"
import { CalendarDays, MapPin, Users } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [event, allMembers] = await Promise.all([
    getEventById(id),
    getMembers(),
  ])

  if (!event) notFound()

  const confirmedEmails = new Set(event.attendances.map((a) => a.member.email))

  const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Cover image */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={event.coverImageUrl}
          alt={`Capa do evento ${event.title}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title + meta */}
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

      {/* Description */}
      {event.description && (
        <p className="text-zinc-600 text-sm leading-relaxed whitespace-break-spaces">{event.description}</p>
      )}

      {/* Attendees */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-700">Presenças</h2>
          <AddAttendancesDialog
            eventId={id}
            allMembers={allMembers}
            confirmedEmails={confirmedEmails}
          />
        </div>
        {event.attendances.length > 0 ? (
          <div className="grid grid-cols-5 gap-4">
            {event.attendances.map((attendance) => (
              <MemberCard key={attendance.id} member={attendance.member} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">Nenhuma presença registrada ainda.</p>
        )}
      </section>

      {/* Photos */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-700">Fotos</h2>
        </div>
        {event.photos.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {event.photos.map((photo) => (
              <div key={photo.id} className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={photo.url}
                  alt="Foto do evento"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">Nenhuma foto adicionada ainda.</p>
        )}
      </section>
    </div>
  )
}
