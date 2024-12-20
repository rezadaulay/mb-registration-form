<script setup lang="ts">
useSeoMeta({
  title: 'Admin Panel',
//   ogTitle: 'Form Registrasi',
//   description: 'Silahkan isi form berikut untuk dapat mengikuti event di muslim berdedikasi 7.',
//   ogDescription: 'Silahkan isi form berikut untuk dapat mengikuti event di muslim berdedikasi 7.',
//   ogImage: 'https://example.com/image.png',
//   twitterCard: 'summary_large_image',
})

const sidebar: Ref<boolean> = ref(false);
const menuItems:Array<any> = [
    { title: 'Home', path: '/manage', icon: 'home' },
    { title: 'Jenis Acara', path: '/manage/event-types', icon: 'format-list-bulleted-type' },
    { title: 'Pendaftar', path: '/manage/registrans', icon: 'face' }
]
</script>
<template>
    <v-app class="body-container">
        <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>
        <v-toolbar-title>Registrasi MB</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template> -->
      </v-app-bar>


    <v-navigation-drawer v-model="sidebar" temporary>
        <v-list-item v-for="item in menuItems" :key="item.title" :prepend-icon="`mdi-${item.icon}`" :to="item.path" :title="item.title"></v-list-item>
    </v-navigation-drawer>

    <!-- <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/manage" tag="span" style="cursor: pointer">
          Registrasi MB
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar> -->
    
    <v-container style="margin-top: 80px;">
      <slot />
    </v-container>
    
  </v-app>
</template>
<style>
.body-container {
    background-image: linear-gradient(360deg,#f5ebdf 3%,#eae2b7 100%)!important;
}
</style>