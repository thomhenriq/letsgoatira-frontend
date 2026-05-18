import { env } from '@/lib/env'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const formData = await request.formData()

  const res = await fetch(`${env.API_URL}/events/${id}/photos`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    return NextResponse.json({ error: res.statusText }, { status: res.status })
  }

  return NextResponse.json(await res.json())
}
