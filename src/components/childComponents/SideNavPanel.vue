<template>
    <!-- <v-navigation-drawer
      v-model="this.sidePanelVis"
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
    </v-navigation-drawer> -->

    <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list  nav>
          <v-list-item v-if="this.isLoggedIn"
            prepend-avatar="https://heish.net/img/heish.jpg"
            title="Heish"
            subtitle="sandra_a88@gmailcom"
            value="profile"
            :to="'/profile/864b39528c6fff7a368a7f3bac219fdebc7c3d0ae778adaed6fec7e18a1ed696'"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-home" title="Home" value="home" :to="'/'"></v-list-item>
          <v-list-item disabled prepend-icon="mdi-message" title="Messages" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-swap-horizontal" title="Convert Key" value="convert" :to="'/convert'"></v-list-item>
          <v-list-item disabled prepend-icon="mdi-cog" title="Settings" value="settings"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
  import {Store} from '@/store/index.js'
  import {storeToRefs} from 'pinia'
  import {ref} from 'vue'
  import SearchNpubBar from '@/components/childComponents/SearchNpubBar.vue'
  import SideNavPanel from '@/components/childComponents/SideNavPanel.vue'
  export default {
    setup() {
      const store = Store()
      const { connectedRelays, loggedInPk, sidePanelVis } = storeToRefs(store)
      const { createRelayPool } = store
        
      return {
        sidePanelVis,
        store
      }
    },
    data: function() {
        return {
            isLoggedIn:true
        }
    }

  }



</script>