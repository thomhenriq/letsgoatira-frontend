export type MemberRole = 'trainee' | 'advisor' | 'coordinator' | 'director'

export type Location = {
    id: string
    name: string
    city: string
    state: string
    country: string
    latitude: number
    longitude: number
    events: Event[]
}

export type Member = {
    id: string
    name: string
    email: string
    role: MemberRole
    avatarUrl: string
    attendances: Attendance[]
}

export type Attendance = {
    id: string
    event: Event
    member: Member
}

export type Photo = {
    id: string
    url: string
    key: string
    event: Event
}

export type Event = {
    id: string
    title: string
    description: string
    date: Date
    coverImageUrl: string
    location: Location
    attendances: Attendance[]
    photos: Photo[]
}