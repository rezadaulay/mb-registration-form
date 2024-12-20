import { createError } from 'h3'
import type { Database } from '~~/types/database.types'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)

  console.log(body)
  const { data, error } = await client.from('registrants')
  .insert({
    event_type_id: body.event_type_id,
    name: body.name,
    phone: body.phone,
    gender: body.gender
  })
  console.log(data)
  console.log(error)
  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})