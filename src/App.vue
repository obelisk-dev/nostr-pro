<template>
  <v-app class="text-primary">
    <!-- TOP APP BAR -->
    <v-app-bar >
      <v-app-bar-nav-icon @click="sidePanelVis = !sidePanelVis"></v-app-bar-nav-icon> 
      <v-toolbar-title class="text-primary">
        <BrowserExtBtn/>
      </v-toolbar-title>
      <!-- <v-btn disabled="true" class="align-right">Connect Web3</v-btn> -->
      <div v-if="!this.$vuetify.display.mobile" style="width:40%">
        <SearchNpubBar/>
      </div>
      <div class="px-2"></div>
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
  import BrowserExtBtn from '@/components/childComponents/BrowserExtBtn.vue'
  import router from '@/router'
  import { useDisplay } from 'vuetify'
  export default {
    setup() {
      const store = Store()
      const { connectedRelays, loggedInPk, sidePanelVis } = storeToRefs(store)
      const { createRelayPool } = store
      const relaysConnected = ref(false)
      const { mobile } = useDisplay()
      const isMobile = mobile.value
      return {
        relaysConnected,
        createRelayPool,
        connectedRelays,
        loggedInPk,
        sidePanelVis,
        store,
        isMobile
      }
    },
    components:{
      SearchNpubBar,
      SideNavPanel,
      BrowserExtBtn
    },

    watch: {
      //loggedInPk: 'getProfile'
    },
    data: () => 
      ({ 
        overlay: false
      }),
    mounted: async function() {
      this.sidePanelVis = !this.isMobile
      let num = await this.createRelayPool()
      this.relaysConnected = true
      // console.log('m',this.$vuetify.display.mobile)
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
