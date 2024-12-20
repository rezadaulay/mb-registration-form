<template>
    <v-app class="body-container">
        <v-container class="h-100">
            <slot />
        </v-container>
    </v-app>
</template>
<style>
.body-container {
    background-image: linear-gradient(360deg,#f5ebdf 3%,#eae2b7 100%)!important;
}
</style>