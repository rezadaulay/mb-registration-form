<script setup lang="ts">
useSeoMeta({
  title: 'Form Registrasi',
  ogTitle: 'Form Registrasi',
  description: 'Silahkan isi form berikut untuk dapat mengikuti event di muslim berdedikasi 7.',
  ogDescription: 'Silahkan isi form berikut untuk dapat mengikuti event di muslim berdedikasi 7.',
})

import type { Database } from '~~/types/database.types'
const client = useSupabaseClient<Database>()
const route = useRoute();
if (!route.params.slug) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Data Not Found'
    })
}
const { data, error } = await client.from('eventTypes').select().eq('slug', route.params.slug).single();
if (error) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Opps.. something wrongs'
  })
}
if (!data) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Data Not Found'
    })
}

const registrationForm: Ref<HTMLFormElement | null> = ref(null)

const snackbar: Ref<boolean> = ref(false);
const snackbarContent: Ref<string | null> = ref(null);

const form: Registrant = reactive({
    name: '',
    phone: '',
    event_type: route.params.slug,
    gender: 'pria',
});

const nameRules: Array<(value: string) => boolean | string> = [(value: string) => !!value || 'Wajib Diisi.'];
const phoneRules: Array<(value: string) => boolean | string> = [(value: string) => !!value || 'Wajib Diisi.'];

const showSnackbar = async (message: string) => {
    snackbarContent.value = message;
    snackbar.value = true;
}

const submit = async () => {
    const {valid, errors} = await registrationForm.value?.validate()
    // lastErrors.value = errors
    console.log(errors)
    if (!valid) {
        showSnackbar('Silahkan isi semua kolom')
    }
    // alert(`validate() is valid: ${valid}`)
}
</script>
<template>
    <v-snackbar
      v-model="snackbar"
    >{{ snackbarContent }}</v-snackbar>
    <div class="d-flex justify-center align-center h-100 registrant-container">
        <div>
            <img src="https://muslimberdedikasi.com/wp-content/uploads/2024/11/MB-7-Logo-Text-1280x219.png" alt="" style="max-width: 100%;" class="mb-2">
            <v-card title="Registrasi Peserta">
                <v-card-text>
                    <v-form @submit.prevent="submit" ref="registrationForm">
                        <div></div>
                        <v-text-field
                            class="mb-3"
                            v-model="form.name"
                            :rules="nameRules"
                            label="Nama anda"
                            required
                        ></v-text-field>
                        <v-phone-input
                            v-model="form.phone"
                            :rules="phoneRules"
                            label="No Hp Anda"
                            required
                        />
                        <!-- <v-text-field
                            v-model="form.phone"
                            :rules="phoneRules"
                            label="No Hp"
                            required
                        ></v-text-field> -->
                        <v-btn class="mt-2" type="submit" color="primary" block>Submit</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<style>
.registrant-container {
    max-width: 600px;
    margin: auto;
}
</style>