import { api } from "@/lib/api";
import { Event } from "@/types";

export async function getEvents() {
    return api<Event[]>('/events')
}

export async function getEventById(eventId: string): Promise<Event | null> {
    return api<Event>(`/events/${eventId}`)
}

export async function createEvent(formData: FormData): Promise<Event> {   
    const location = {
        name: formData.get('location-name') as string,
        city: formData.get('location-city') as string,
        state: formData.get('location-state') as string,
        country: formData.get('location-country') as string,
        latitude: formData.get('location-latitude') as string,
        longitude: formData.get('location-longitude') as string
    }

    formData.set('location', JSON.stringify(location))
    
    return api<Event>('/events', {
        method: 'POST',
        body: formData
    })
}

export async function addEventAttendances(eventId: string, emails: string[]): Promise<void> {
    return api(`/events/${eventId}/attendances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails }),
    })
}