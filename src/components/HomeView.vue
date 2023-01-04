<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex justify-center fill-height">
      <v-row class="justify-center ">
        <v-sheet 
          rounded='xl'
          elevation="10"
          class="py-8 px-2 fill-height ma-4"
          width="100%"
          variant="outlined"
        >
        
        <h1  class="text-h2 text-primary text-center mx-2">
          
          <VueWriter :array="['Nostr.pro']" :typeSpeed="200" :start="50" :iterations='1' />
        </h1>
          
        </v-sheet>
      </v-row>
    <!-- end top section -->
      
    <!-- secondsection 2 columns -->
      <v-row justify="center">
        <v-col :cols="isMobile ? '12':'6'"  >
          <HomeFeedCard/>
        </v-col>
    <!-- right side -->
        <v-col :cols="isMobile ? '12':'5'" >
          
          <v-row justify="center" class="text-center">
            <v-col cols="12" >
              <span class="text-h4">Getting Started</span>
              <v-divider></v-divider>
              <div class="py-2" />
              <v-btn 
                href='https://addons.mozilla.org/en-US/firefox/addon/nos2x/'
                target="_blank"
                min-width="164"
                rel="noopener noreferrer"
              >
              Download Nos2x (firefox)
            </v-btn>
            <div class="py-2" />
            <v-btn 
                href='https://chrome.google.com/webstore/detail/nos2x/kpgefcfmnafjgpblomihpgmejjdanjjp'
                target="_blank"
                min-width="164"
                rel="noopener noreferrer"
              >
              Download Nos2x (chrome)
            </v-btn>
            <div class="py-2" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" >
              <SearchNpubBar/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-responsive>

  </v-container>
</template>

<script>
    import VueWriter from "vue-writer";
    import ProfileCard from './childComponents/ProfileCard.vue'
    import HomeFeedCard from '@/components/childComponents/HomeFeedCard.vue'
    import { useDisplay } from 'vuetify'
    export default {
        name: 'HomeView',
        components: {
          VueWriter,
          ProfileCard,
          HomeFeedCard
        },
        setup() {
          const { mobile } = useDisplay()
          const isMobile = mobile.value
          return {
            isMobile
          }   

        },

        data: function() {
            return {
             

            };
        },
        mounted: function() {
 
        },
        unmounted: function() {
          
        },
        methods: {

        }
    }
</script>


