<script setup lang="ts">
definePageMeta({
  layout: 'manage'
})

useSeoMeta({
  title: 'Daftar Peserta',
})


const snackbar: Ref<boolean> = ref(false);
const snackbarContent: Ref<string | null> = ref(null);
const showSnackbar = async (message: string) => {
    snackbarContent.value = message;
    snackbar.value = true;
}

const formatDate = (isoString: string | undefined): string => {
  if (!isoString) {
    return '';
  }
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} ${hour}:${minute}`;
}

// import type EventType from '~~/types/eventType'
import type { Database } from '~~/types/database.types'

const client = useSupabaseClient<Database>()

const route = useRoute()
if (!route.params.eventTypeid) {
    await navigateTo('/manage/event-types')
}

const eventType: EventType = reactive({
  id: undefined,
  title: ''
});

const loading: Ref<boolean> = ref(true)
const loadEventType = async () => {
  const { data, error } = await client.from('eventTypes').select().eq('id', route.params.eventTypeid).single();
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Opps.. something wrongs'
    })
  }
  eventType.id = data.id
  eventType.title = data.title
  loadRegistrants()
}

const showAll: Ref<boolean> = ref(false)
const registrants: Ref<Array<Registrant> | null> = ref(null)
const loadRegistrants = async () => {
  const { data, error } = await client.from('registrants').select('id, name, phone, gender, email, event_type_id, closed, created_at').eq('event_type_id', eventType.id).in('closed', showAll.value ? [true, false] : [false]).order('created_at', { ascending: true })
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Opps.. something wrongs'
    })
  }
  registrants.value = data
  loading.value = false
}

const callRegistrant = async (registrant: Registrant) => {}

const closeRegistrant = async (registrant: Registrant) => {
  showSnackbar('Memproses data...')
  const { data, error } = await client.from('registrants').update({
    closed: true
  }).eq('id', registrant.id)
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Opps.. something wrongs'
    })
  }
  loadRegistrants()
}

loadEventType()
</script>
<template>
  <v-snackbar
    v-model="snackbar"
  >{{ snackbarContent }}</v-snackbar>
  <v-card :title="`Pendaftar ${eventType.title}`">
    <v-card-text>
      <v-checkbox v-if="!loading" v-model="showAll" @change="loadRegistrants()" label="Munculkan semua"></v-checkbox>
      <v-skeleton-loader v-if="loading" type="paragraph"></v-skeleton-loader>
      <v-table v-else class="mt-n5">
        <thead>
          <tr>
            <th class="text-left" width="40%">
              <strong>Peserta</strong>
            </th>
            <!-- <th class="text-left">
              <strong>Gender</strong>
            </th> -->
            <!-- <th class="text-left">
              <strong>Phone</strong>
            </th> -->
            <th class="text-center">
              <strong>Status</strong>
            </th>
            <th class="text-left">
              
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in registrants"
            :key="item.id"
          >
            <td width="40%"><small>{{ item.gender === 'pria' ? 'Ikhwan' : 'Akhwat' }}</small><br><strong>{{ item.name }}</strong><br><a :href="`https://api.whatsapp.com/send?phone=${item.phone.replace('+', '')}`" target="_blank">{{ item.phone }}</a><br>Daftar: <strong>{{ formatDate(item.created_at) }}</strong></td>
            <!-- <td>{{ item.gender === 'pria' ? 'Ikhwan' : 'Akhwat' }}</td> -->
            <!-- <td>{{ item.phone }}</td> -->
            <td class="text-center"><v-chip :color="item.closed ? 'success' : ''">{{ item.closed ? 'Selesai' : 'Menunggu'}}</v-chip></td>
            <td class="text-right">
              <div class="pt-2 pb-2" v-if="!item.closed">
                <v-btn icon="mdi-phone" size="x-small" color="primary" class="mb-2" @click.prevent="callRegistrant(item)"></v-btn><br>
                <v-btn icon="mdi-check" color="success" size="x-small" @click.prevent="closeRegistrant(item)"></v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>