'use server'

import { createEvent, addEventAttendances } from '@/api/events'
import { createMember } from '@/api/members'

export async function createEventAction(_prev: { error: string | null }, formData: FormData) {
  try {
    await createEvent(formData)
    return { error: null }
  } catch {
    return { error: 'Erro ao criar evento. Verifique os dados e tente novamente.' }
  }
}

export async function addAttendancesAction(
  _prev: { error: string | null },
  { eventId, emails }: { eventId: string; emails: string[] }
) {
  try {
    await addEventAttendances(eventId, emails)
    return { error: null }
  } catch {
    return { error: 'Erro ao registrar presenças. Tente novamente.' }
  }
}

export async function createMemberAction(_prev: { error: string | null }, formData: FormData) {
  try {
    await createMember(formData)
    return { error: null }
  } catch {
    return { error: 'Erro ao criar membro. Verifique os dados e tente novamente.' }
  }
}
