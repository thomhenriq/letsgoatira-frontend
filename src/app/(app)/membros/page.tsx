import { getMembers } from "@/api/members"
import { MemberCard } from "@/components/member-card"

export default async function MembrosPage() {
  const members = await getMembers()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Membros</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}
