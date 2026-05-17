import { Member } from "@/types"
import Image from "next/image"

const roleLabels: Record<Member['role'], string> = {
  trainee: 'Trainee',
  advisor: 'Assessor',
  coordinator: 'Coordenador',
  director: 'Diretor',
}

export function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-20 rounded-full overflow-hidden border border-zinc-200 shrink-0">
        <Image
          src={member.avatarUrl}
          alt={`Foto de ${member.name}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-zinc-800 leading-tight">{member.name}</p>
        <p className="text-xs text-zinc-400 mt-0.5">{roleLabels[member.role]}</p>
      </div>
    </div>
  )
}
