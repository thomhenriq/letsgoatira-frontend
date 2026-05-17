import { Event } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, MapPin, Users } from "lucide-react"


export function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/eventos/${event.id}`} className="group flex rounded-md overflow-hidden border border-zinc-200 bg-white">
      <div className="relative w-36 shrink-0">
        <Image
          src={event.coverImageUrl}
          alt={`Capa do evento ${event.title}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between p-4 gap-2 min-w-0">
        <div>
          <h2 className="font-semibold text-zinc-800 text-base leading-tight group-hover:text-primary transition-colors truncate">
            {event.title}
          </h2>
          <p className="text-zinc-500 text-sm mt-1 line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {new Date(event.date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </span>

          {event.location?.name && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" />
              {event.location.name}, {event.location.city}
            </span>
          )}

          <span className="flex items-center gap-1">
            <Users className="size-3.5" />
            {event.attendances.length} presença{event.attendances.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </Link>
  )
}