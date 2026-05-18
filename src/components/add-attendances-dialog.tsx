'use client'

import { addAttendancesAction } from '@/lib/actions'
import { Member } from '@/types'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Check, UserPlus, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Button } from './button'

interface AddAttendancesDialogProps {
  eventId: string
  allMembers: Member[]
  confirmedEmails: Set<string>
}

export function AddAttendancesDialog({ eventId, allMembers, confirmedEmails }: AddAttendancesDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleClose() {
    if (!isPending) {
      setIsOpen(false)
      setSelected(new Set())
      setError(null)
    }
  }

  function toggleMember(email: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(email)) next.delete(email)
      else next.add(email)
      return next
    })
  }

  function handleSubmit() {
    if (selected.size === 0) {
      setError('Selecione ao menos um membro.')
      return
    }
    startTransition(async () => {
      const result = await addAttendancesAction({ error: null }, {
        eventId,
        emails: Array.from(selected),
      })
      if (result.error) {
        setError(result.error)
      } else {
        setIsOpen(false)
        setSelected(new Set())
        setError(null)
        router.refresh()
      }
    })
  }

  const availableMembers = allMembers.filter((m) => !confirmedEmails.has(m.email))
  const alreadyConfirmed = allMembers.filter((m) => confirmedEmails.has(m.email))

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <UserPlus className="size-4" />
        Novas resenças
      </Button>

      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white shadow-xl flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 shrink-0">
              <DialogTitle className="text-base font-semibold text-zinc-800">
                Registrar resenças
              </DialogTitle>
              <button
                onClick={handleClose}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
                aria-label="Fechar"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Member list */}
            <div className="overflow-y-auto flex-1 px-6 py-4 flex flex-col gap-1">
              {/* Available to select */}
              {availableMembers.map((member) => {
                const isSelected = selected.has(member.email)
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMember(member.email)}
                    className={`flex items-center gap-3 w-full rounded-md px-3 py-2 text-left transition-colors ${
                      isSelected
                        ? 'bg-primary/10 ring-1 ring-primary/40'
                        : 'hover:bg-zinc-50'
                    }`}
                  >
                    <div className="relative size-9 rounded-full overflow-hidden shrink-0 border border-zinc-200">
                      <Image src={member.avatarUrl} alt={member.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-800 truncate">{member.name}</p>
                      <p className="text-xs text-zinc-400 truncate">{member.email}</p>
                    </div>
                    <div className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'bg-primary border-primary' : 'border-zinc-300'
                    }`}>
                      {isSelected && <Check className="size-3 text-white" strokeWidth={3} />}
                    </div>
                  </button>
                )
              })}

              {/* Already confirmed — disabled */}
              {alreadyConfirmed.length > 0 && (
                <>
                  <p className="text-xs font-medium text-zinc-400 mt-3 mb-1 px-1">Já confirmados</p>
                  {alreadyConfirmed.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 w-full rounded-md px-3 py-2 opacity-50 cursor-not-allowed"
                    >
                      <div className="relative size-9 rounded-full overflow-hidden shrink-0 border border-zinc-200">
                        <Image src={member.avatarUrl} alt={member.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-800 truncate">{member.name}</p>
                        <p className="text-xs text-zinc-400 truncate">{member.email}</p>
                      </div>
                      <div className="size-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center shrink-0">
                        <Check className="size-3 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  ))}
                </>
              )}

              {allMembers.length === 0 && (
                <p className="text-sm text-zinc-400 text-center py-6">Nenhum membro encontrado.</p>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-200 px-6 py-4 shrink-0 flex flex-col gap-3">
              {selected.size > 0 && (
                <p className="text-xs text-zinc-500">
                  {selected.size} membro{selected.size !== 1 ? 's' : ''} selecionado{selected.size !== 1 ? 's' : ''}
                </p>
              )}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="rounded-md px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <Button onClick={handleSubmit} disabled={isPending || selected.size === 0}>
                  {isPending ? 'Salvando...' : 'Confirmar presenças'}
                </Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
