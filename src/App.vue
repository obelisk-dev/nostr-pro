<template>
  <v-app class="text-primary">
    <!-- TOP NAV BAR -->
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-primary font-weight-bold">Nostr Pro</v-toolbar-title>
      <!-- <v-btn disabled="true" class="align-right">Connect Web3</v-btn> -->
    </v-app-bar>
    <!-- SIDE DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      class="pt-10 d-flex justify-center"
      rail
    >
      <v-btn
        class="ma-1 pa-2"
        icon="mdi-home"
        color="primary"
        :to="'/'"
      ></v-btn>
      <v-btn
        class="ma-1 pa-2"
        icon="mdi-swap-horizontal"
        color="primary"
        :to="'/convert'"
      ></v-btn>
    </v-navigation-drawer>
    <!-- Main View -->
    <v-main>
      <router-view></router-view>
    </v-main>
    <!-- Loading Overlay -->
    <v-overlay :model-value="overlay" class="text-center align-center justify-center">
        <v-progress-circular
            indeterminate
            size="100"
            color="white"
            width="8"
        ></v-progress-circular>
        <div class="pa-2"></div>
        <body class="body-1 white font-weight-bold">This may take a minute...</body>
    </v-overlay>
    <v-footer padless absolute inset app height="40" width="auto" class="py-4 justify-center text-center" >
     <strong>Nostr Pro</strong> <div class="px-4"/> <a href="https://www.nostr.guru/p/864b39528c6fff7a368a7f3bac219fdebc7c3d0ae778adaed6fec7e18a1ed696"> Heish </a>
    </v-footer>
  </v-app>
</template>

<script setup>
  import HomeView from '@/components/HomeView.vue'
</script>

<script>
  export default {
    data: () => 
      ({ 
        drawer: false,
        overlay: false
      }),
  }
</script>

<style lang="scss">
  @import "./sass/variables";
</style>
