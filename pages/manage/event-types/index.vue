<script setup lang="ts">
definePageMeta({
  layout: 'manage'
})

import type EventType from '~~/types/eventType'
import type { Database } from '~~/types/database.types'

const client = useSupabaseClient<Database>()

const { data, error } = await client.from('eventTypes').select('id, title').order('created_at')
if (error) {
  throw createError({ statusMessage: error.message })
}
const eventTypes: Ref<Array<EventType>> = ref(data)

const removeEventType = async (eventType: EventType) => {
  eventTypes.value = eventTypes.value.filter(t => t.id !== eventType.id)
  await client.from('eventTypes').delete().match({ id: eventType.id })
}


// console.log('data', eventTypes.value)
</script>
<template>
  <v-card title="Jenis Acara">
    <v-card-text>
      <div class="text-right">
        <v-btn icon="mdi-plus" size="x-small" color="primary"></v-btn>
      </div>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              <strong>Judul Acara</strong>
            </th>
            <th class="text-left" width="30%">
              
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in eventTypes"
            :key="item.id"
          >
            <td>{{ item.title }}</td>
            <td class="text-right">
              <v-btn icon="mdi-pencil" size="x-small" class="mr-2"></v-btn>
              <v-btn icon="mdi-trash-can-outline" color="error" size="x-small" @click.prevent="removeEventType(item)"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>