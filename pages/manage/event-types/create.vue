<script setup lang="ts">
import EventTypes from '@/types/eventTypes.d'
// import type { Database } from '@/types/database.types'

useSeoMeta({
  title: 'Tambah Jenis Acara',
})

const snackbar: Ref<boolean> = ref(false);
const snackbarContent: Ref<string | null> = ref(null);

const form: EventType = reactive({
    title: null,
});

const titleRules: boolean = [(value: string) => !!value || 'Wajib Diisi.'];

const showSnackbar = async (message) => {
    snackbarContent.value = message;
    snackbar.value = true;
}

const submit = async () => {
    const {valid, errors} = await loginForm.value.validate()
    // lastErrors.value = errors
    // console.log(errors)
    if (!valid) {
      showSnackbar('Silahkan isi semua kolom')
    } else {
    //   const { data, error } = await auth.signInWithPassword({
    //     title: form.title,
    //     password: form.password
    //   })
    //   if (error) {
    //     showSnackbar('Username/Password salah')
    //   }
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
                    <v-form @submit.prevent="submit" ref="loginForm">
                        <div></div>
                        <v-text-field
                            class="mb-3"
                            v-model="form.title"
                            :rules="titleRules"
                            label="Judul acara"
                            required
                        ></v-text-field>
                        <v-btn class="mt-2" type="submit" color="primary" block>Submit</v-btn>
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