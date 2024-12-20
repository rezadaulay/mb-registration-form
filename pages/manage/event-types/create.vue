<script setup lang="ts">
definePageMeta({
  layout: 'manage'
})

import type EventType from '~~/types/eventType'
import type { Database } from '~~/types/database.types'
const client = useSupabaseClient<Database>()
const user = useSupabaseUser()

// import type { Database } from '@/types/database.types'

const loading: Ref<boolean> = ref(false)

useSeoMeta({
  title: 'Tambah Jenis Acara',
})

const createForm: Ref<HTMLFormElement | null> = ref(null)

const snackbar: Ref<boolean> = ref(false);
const snackbarContent: Ref<string | null> = ref(null);

const form: EventType = reactive({
    title: '',
});

const titleRules: Array<(value: string) => boolean | string> = [(value: string) => !!value || 'Wajib Diisi.'];

const showSnackbar = async (message: string) => {
    snackbarContent.value = message;
    snackbar.value = true;
}

const submit = async () => {
    const {valid, errors} = await createForm.value?.validate()
    if (!valid) {
      showSnackbar('Silahkan isi semua kolom')
    } else {
        loading.value = true

        const { data } = await client.from('eventTypes')
            .insert({
                title: form.title
            })
            // .select('id, title')
            // .single()

        // tasks.value.push(data)
        createForm.value?.reset()
        loading.value = false
        showSnackbar('Data berhasil ditambahkan')
        navigateTo('/manage/event-types')
    }
}
</script>

<template>
    <v-snackbar
      v-model="snackbar"
    >{{ snackbarContent }}</v-snackbar>
    <div class="d-flex justify-center align-center h-100 form-container">
        <div class="w-100">
            <!-- <img src="https://muslimberdedikasi.com/wp-content/uploads/2024/11/MB-7-Logo-Text-1280x219.png" alt="" style="max-width: 100%;" class="mb-2"> -->
            <v-card title="Tambah Jenis Acara">
                <v-card-text>
                    <v-form @submit.prevent="submit" ref="createForm">
                        <div></div>
                        <v-text-field
                            class="mb-3"
                            v-model="form.title"
                            :rules="titleRules"
                            label="Judul acara"
                            required
                        ></v-text-field>
                        <v-btn class="mt-2" type="submit" color="primary" block :loading="loading">Submit</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<style>
.form-container {
    max-width: 600px;
    /* width: 400px; */
    margin: auto;
}
</style>