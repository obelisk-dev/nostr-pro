<template>
  <v-app class="text-primary">
    <!-- TOP APP BAR -->
    <v-app-bar >
      <v-app-bar-nav-icon @click="sidePanelVis = !sidePanelVis"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-primary font-weight-bold ">Nostr Pro</v-toolbar-title>
      <!-- <v-btn disabled="true" class="align-right">Connect Web3</v-btn> -->
      <div  class="" style="width:30%">
        <SearchNpubBar/>
      </div>
      <div class="px-6"></div>
      <v-btn variant="outlined">Connect Nos2x</v-btn>
    </v-app-bar>
    <!-- SIDE DRAWER -->
    <SideNavPanel/>
    <!-- Main View -->
    <v-main v-if = "relaysConnected">
      <router-view></router-view>
    </v-main>
    <!-- Loading Overlay -->
    <v-overlay :model-value="!relaysConnected" class="text-center align-center justify-center">
        <v-progress-circular
            indeterminate
            size="100"
            color="white"
            width="8"
        ></v-progress-circular>
        <div class="pa-2"></div>
        <body class="body-1 white font-weight-bold">Connecting Relays... {{ this.connectedRelays }}  connected.</body>
    </v-overlay>
    <v-footer padless absolute inset app height="40" width="auto" class="py-4 justify-center text-center" >
      <v-btn variant='text' href="https://github.com/obelisk-dev/nostr-pro"> GitHub </v-btn> <div class="px-6"/>  <strong>Nostr Pro</strong> <div class="px-6"/> <v-btn variant='text' to="/profile/864b39528c6fff7a368a7f3bac219fdebc7c3d0ae778adaed6fec7e18a1ed696"> Heish </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
  import {Store} from './store/index.js'
  import {storeToRefs} from 'pinia'
  import {ref} from 'vue'
  import SearchNpubBar from '@/components/childComponents/SearchNpubBar.vue'
  import SideNavPanel from '@/components/childComponents/SideNavPanel.vue'
  import router from '@/router'
  export default {
    setup() {
      const store = Store()
      const { connectedRelays, loggedInPk, sidePanelVis } = storeToRefs(store)
      const { createRelayPool } = store
      const relaysConnected = ref(false)
        
      return {
        relaysConnected,
        createRelayPool,
        connectedRelays,
        loggedInPk,
        sidePanelVis,
        store
      }
    },
    components:{
      SearchNpubBar,
      SideNavPanel
    },

    watch: {
      //loggedInPk: 'getProfile'
    },
    data: () => 
      ({ 
        overlay: false
      }),
    mounted: async function() {
      let num = await this.createRelayPool()
      this.relaysConnected = true
      //this.getProfile()
    },
    methods: {
      getProfile() {

      },
      heish() {
        this.router.push({ path: '/profile/864b39528c6fff7a368a7f3bac219fdebc7c3d0ae778adaed6fec7e18a1ed696' })
      },
    }
  }
</script>

<style lang="scss">
  @import "./sass/variables";
</style>
