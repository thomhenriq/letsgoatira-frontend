'use client'

import { createMemberAction } from '@/lib/actions'
import { MemberRole } from '@/types'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { Button } from './button'

const roles: { value: MemberRole; label: string }[] = [
  { value: 'trainee', label: 'Trainee' },
  { value: 'advisor', label: 'Assessor' },
  { value: 'coordinator', label: 'Coordenador' },
  { value: 'director', label: 'Diretor' },
]

export function NewMemberDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const [state, action, isPending] = useActionState(
    async (prev: { error: string | null }, formData: FormData) => {
      const result = await createMemberAction(prev, formData)
      if (!result.error) {
        setIsOpen(false)
        router.refresh()
      }
      return result
    },
    { error: null }
  )

  function handleClose() {
    if (!isPending) setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Novo Membro</Button>

      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
              <DialogTitle className="text-base font-semibold text-zinc-800">
                Novo Membro
              </DialogTitle>
              <button
                onClick={handleClose}
                className="text-zinc-400 hover:text-zinc-600 transition-colors"
                aria-label="Fechar"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Form */}
            <form action={action} className="flex flex-col gap-4 px-6 py-5">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-zinc-700">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Ex: João Silva"
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="nome@atriajr.com.br"
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1">
                <label htmlFor="role" className="text-sm font-medium text-zinc-700">
                  Cargo <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  defaultValue=""
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/60"
                >
                  <option value="" disabled>Selecione um cargo</option>
                  {roles.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Avatar */}
              <div className="flex flex-col gap-1">
                <label htmlFor="avatar" className="text-sm font-medium text-zinc-700">
                  Foto de perfil <span className="text-red-500">*</span>
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  required
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-500 file:mr-3 file:rounded file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-xs file:font-medium file:text-primary hover:file:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
              </div>

              {/* Error */}
              {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="rounded-md px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Criando...' : 'Criar membro'}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
