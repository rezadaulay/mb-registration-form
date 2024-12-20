export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      registrants: {
        Row: {
          created_at: string | null
          id: number
          event_type_id: number
          name: string
          phone: string
          gender: string
          email?: string | null
          closed: boolean | null
        }
        Insert: {
          created_at?: string | null
          event_type_id: number
          name: string
          phone: string
          gender: string
          email?: string | null
          closed?: boolean | null
        }
        Update: {
          created_at?: string | null
          event_type_id: number
          name: string
          phone: string
          gender: string
          email?: string | null
          closed?: boolean | null
        }
      },
      eventTypes: {
        Row: {
          created_at: string | null
          id: number
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          title: string
        }
        Update: {
          created_at?: string | null
          id?: number
          title?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}