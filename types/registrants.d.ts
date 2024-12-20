declare interface Registrant {
    id?: number
    name: string
    phone: string
    event_type_id: number | undefined,
    gender: string
    email?: string
    closed?: boolean
    created_at?: string
}