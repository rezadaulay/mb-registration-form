import { createError } from 'h3'
import type { Database } from '~~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client.from('eventTypes').select('id, title').eq('slug', slug).order('created_at').single()
  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})