import 'v-phone-input/dist/v-phone-input.css';
import 'flag-icons/css/flag-icons.min.css';
// @ts-ignore
import { createVPhoneInput } from 'v-phone-input';

export default defineNuxtPlugin((nuxtApp) => {
  const vPhoneInput = createVPhoneInput({
    countryIconMode: 'svg',
    defaultCountry: 'ID',
    // label: 'No HP',
    countryLabel: 'Negara',
    invalidMessage: ({ label, example }) =>
      `${label} tidak valid (contoh: ${example}).`,  
  });

  nuxtApp.vueApp.use(vPhoneInput);
});