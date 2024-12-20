<script setup lang="ts">
import type User from '~~/types/user'
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

watchEffect(() => {
  if (user.value) {
    navigateTo('/manage')
  }
})



useSeoMeta({
  title: 'Login',
  ogTitle: 'Login',
  // description: 'Silahkan isi form berikut untuk dapat mengikuti event di muslim berdedikasi 7.',
  // ogDescription: 'Silahkan isi form berikut untuk dapat mengikuti event di muslim berdedikasi 7.',
//   ogImage: 'https://example.com/image.png',
//   twitterCard: 'summary_large_image',
})

const loginForm: Ref<HTMLFormElement | null> = ref(null)

const snackbar: Ref<boolean> = ref(false);
const snackbarContent: Ref<string | null> = ref(null);

const form: User = reactive({
    email: '',
    password: '',
});

const emailRules: Array<(value: string) => boolean | string> = [(value: string) => !!value || 'Wajib Diisi.'];
const passwordRules: Array<(value: string) => boolean | string> = [(value: string) => !!value || 'Wajib Diisi.'];

const showSnackbar = async (message: string) => {
    snackbarContent.value = message;
    snackbar.value = true;
}

const submit = async () => {
    const {valid, errors} = await loginForm.value?.validate()
    // lastErrors.value = errors
    // console.log(errors)
    if (!valid) {
      showSnackbar('Silahkan isi semua kolom')
    } else {
      const { data, error } = await auth.signInWithPassword({
        email: form.email,
        password: form.password
      })
      if (error) {
        showSnackbar('Username/Password salah')
      }
    }
    // alert(`validate() is valid: ${valid}`)
}
</script>
<template>
    <v-snackbar
      v-model="snackbar"
    >{{ snackbarContent }}</v-snackbar>
    <div class="d-flex justify-center align-center h-100 login-container">
        <div class="w-100">
            <!-- <img src="https://muslimberdedikasi.com/wp-content/uploads/2024/11/MB-7-Logo-Text-1280x219.png" alt="" style="max-width: 100%;" class="mb-2"> -->
            <v-card title="Login Admin">
                <v-card-text>
                    <v-form @submit.prevent="submit" ref="loginForm">
                        <div></div>
                        <v-text-field
                            type="email"
                            class="mb-3"
                            v-model="form.email"
                            :rules="emailRules"
                            label="Email anda"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="form.password"
                            :rules="passwordRules"
                            label="Password"
                            type="password"
                            required
                        ></v-text-field>
                        <v-btn class="mt-2" type="submit" color="primary" block>Login</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<style>
.login-container {
    max-width: 600px;
    /* width: 400px; */
    margin: auto;
}
</style>