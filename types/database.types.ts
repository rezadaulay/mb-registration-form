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
          name: string
          phone: string
          gender: string
          user: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          phone: string
          gender: string
          email?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          phone?: string
          gender?: string
          email?: string | null
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