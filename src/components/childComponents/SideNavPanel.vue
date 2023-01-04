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
        rail
        expand-on-hover
        v-model="sidePanelVis"
      >
        <v-list nav>
          <v-list-item v-if="this.loggedInPk"
            :prepend-avatar="this.loggedInProfile.refData.picture"
            :title="this.loggedInProfile.refData.name"
            :subtitle="this.loggedInProfile.npub"
            value="profile"
            :to="'/profile/'+this.loggedInPk"
          ></v-list-item>
          <v-divider v-if="this.loggedInPk"></v-divider>
          <v-list-item prepend-icon="mdi-home" title="Home" value="home" :to="'/'"></v-list-item>
          <v-list-item disabled prepend-icon="mdi-message" title="Messages" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-swap-horizontal" title="Convert Key" value="convert" :to="'/convert'"></v-list-item>
          <v-list-item prepend-icon="mdi-server" title="My Relays" value="relays" :to="'/relays'"></v-list-item>
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
      const { loggedInPk, sidePanelVis, loggedInProfile } = storeToRefs(store)
      const { createRelayPool } = store
        
      return {
        sidePanelVis,
        loggedInPk,
        loggedInProfile,
        store
      }
    },
    data: function() {
        return {

        }
    }

  }



</script>