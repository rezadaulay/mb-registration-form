<script setup lang="ts">
useSeoMeta({
  title: 'Form Registrasi',
  ogTitle: 'Form Registrasi',
  description: 'Silahkan isi form berikut untuk dapat mengikuti event di muslim berdedikasi 7.',
  ogDescription: 'Silahkan isi form berikut untuk dapat mengikuti event di muslim berdedikasi 7.',
})

const route = useRoute();
if (!route.params.slug) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Data Not Found'
    })
}

const { data } = await useFetch(`/api/event-types/${route.params.slug}`);
if (!data || data.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Data Not Found'
    })
}

const eventType : Ref<EventType> = ref(data.value as EventType); 
const registrationForm: Ref<HTMLFormElement | null> = ref(null)

const snackbar: Ref<boolean> = ref(false);
const snackbarContent: Ref<string | null> = ref(null);

const form: Registrant = reactive({
    // id: null,
    name: '',
    phone: '',
    event_type_id: eventType.value.id,
    gender: 'pria',
});

const nameRules: Array<(value: string) => boolean | string> = [(value: string) => !!value || 'Wajib Diisi.'];
const phoneRules: Array<(value: string) => boolean | string> = [(value: string) => !!value || 'Wajib Diisi.'];

const showSnackbar = async (message: string) => {
    snackbarContent.value = message;
    snackbar.value = true;
}

const registered: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const submit = async () => {
    const {valid, errors} = await registrationForm.value?.validate()
    // lastErrors.value = errors
    console.log(errors)
    if (!valid) {
        showSnackbar('Silahkan isi semua kolom')
    } else {
        loading.value = true
        await $fetch(`/api/event-types/create`, {
            method: 'post',
            body: {
                event_type_id: form.event_type_id,
                name: form.name,
                phone: form.phone,
                gender: form.gender
            }
        });
        // if (error) {
        //     loading.value = false;
        //     // @ts-ignore: Unreachable code error
        //     showSnackbar(error.message)
        //     return
        // }
        registered.value = true;
    }
}
</script>
<template>
    <v-snackbar
      v-model="snackbar"
    >{{ snackbarContent }}</v-snackbar>
    <div class="d-flex justify-center align-center h-100 registrant-container">
        <div v-if="!registered">
            <img src="https://muslimberdedikasi.com/wp-content/uploads/2024/11/MB-7-Logo-Text-1280x219.png" alt="" style="max-width: 100%;" class="mb-2">
            <v-card :title="eventType.title" subtitle="Registrasi Peserta">
                <v-card-text>
                    <v-form @submit.prevent="submit" ref="registrationForm">
                        <div></div>
                        <v-radio-group inline v-model="form.gender">
                            <v-radio label="Pria" value="pria"></v-radio>
                            <v-radio label="Wanita" value="wanita"></v-radio>
                        </v-radio-group>

                        <v-text-field
                            class="mb-0 mt-n3"
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
                        <v-btn class="mt-2" type="submit" color="primary" block :loading="loading">Submit</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
        <div v-else>
            <v-alert color="success" title="Pendaftaran berhasil" text="Silahkan menunggu, panitia akan memberi tahu ketika giliran anda."></v-alert>
        </div>
    </div>
</template>

<style>
.registrant-container {
    max-width: 600px;
    margin: auto;
}
</style>