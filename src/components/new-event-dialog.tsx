'use client'

import { createEventAction } from '@/lib/actions'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { Button } from './button'

export function NewEventDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const [state, action, isPending] = useActionState(
    async (prev: { error: string | null }, formData: FormData) => {
      const result = await createEventAction(prev, formData)
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
      <Button onClick={() => setIsOpen(true)}>Novo Evento</Button>

      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
              <DialogTitle className="text-base font-semibold text-zinc-800">
                Novo Evento
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
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-sm font-medium text-zinc-700">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Ex: Reunião Geral"
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm font-medium text-zinc-700">
                  Descrição <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={3}
                  placeholder="Descreva o evento..."
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60 resize-none"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <label htmlFor="date" className="text-sm font-medium text-zinc-700">
                  Data <span className="text-red-500">*</span>
                </label>
                <input
                  id="date"
                  name="date"
                  type="datetime-local"
                  required
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
              </div>

              {/* Location */}
              <fieldset className="flex flex-col gap-3">
                <legend className="text-sm font-medium text-zinc-700">
                  Localização <span className="text-red-500">*</span>
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="location-name" className="text-xs text-zinc-500">Nome</label>
                    <input
                      id="location-name"
                      name="location-name"
                      type="text"
                      required
                      placeholder="Ex: Sede Atria Jr."
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="location-city" className="text-xs text-zinc-500">Cidade</label>
                    <input
                      id="location-city"
                      name="location-city"
                      type="text"
                      required
                      placeholder="Ex: Limeira"
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="location-state" className="text-xs text-zinc-500">Estado</label>
                    <input
                      id="location-state"
                      name="location-state"
                      type="text"
                      required
                      placeholder="Ex: SP"
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="location-country" className="text-xs text-zinc-500">País</label>
                    <input
                      id="location-country"
                      name="location-country"
                      type="text"
                      required
                      defaultValue="Brasil"
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="location-latitude" className="text-xs text-zinc-500">Latitude</label>
                    <input
                      id="location-latitude"
                      name="location-latitude"
                      type="number"
                      step="any"
                      required
                      placeholder="Ex: -22.5646"
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="location-longitude" className="text-xs text-zinc-500">Longitude</label>
                    <input
                      id="location-longitude"
                      name="location-longitude"
                      type="number"
                      step="any"
                      required
                      placeholder="Ex: -47.4014"
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Cover image */}
              <div className="flex flex-col gap-1">
                <label htmlFor="coverImage" className="text-sm font-medium text-zinc-700">
                  Imagem de capa <span className="text-red-500">*</span>
                </label>
                <input
                  id="coverImage"
                  name="coverImage"
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
                  {isPending ? 'Criando...' : 'Criar evento'}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
