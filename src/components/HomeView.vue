<template>

  <v-container class="fill-height">
    <v-responsive class="d-flex justify-center text-center fill-height">
      <v-row class="justify-center fill-height">
      <v-sheet 
        rounded='xl'
        elevation="10"
        class="py-8 px-2 fill-height ma-4"
        
        width="100%"
        variant="outlined"
      >
      
      <h1  class="text-h2 text-primary">
        <VueWriter :array="['Nostr.pro']" :typeSpeed="200" :start="50" :iterations='1' />
      </h1>

      <div class="py-8" />

      <h1 class="text-h4 text-primary" >
        <VueWriter :array="['Useful Nostr tools']" :typeSpeed="50" :start="2000" :iterations='1' />
      </h1>

      <div class="py-8" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            :to="'/convert'"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon
              icon="mdi-swap-horizontal"
              size="large"
              start
            />
            Convert to and from npub
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            :to="'/convert'"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon
              icon="mdi-swap-horizontal"
              size="large"
              start
            />
            Convert to and from npub
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            :to="'/convert'"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon
              icon="mdi-swap-horizontal"
              size="large"
              start
            />
            Convert to and from npub
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            :to="'/convert'"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon
              icon="mdi-swap-horizontal"
              size="large"
              start
            />
            Convert to and from npub
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            :to="'/convert'"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon
              icon="mdi-swap-horizontal"
              size="large"
              start
            />
            Convert to and from npub
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            :to="'/convert'"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon
              icon="mdi-swap-horizontal"
              size="large"
              start
            />
            Convert to and from npub
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            :to="'/convert'"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon
              icon="mdi-swap-horizontal"
              size="large"
              start
            />
            Convert to and from npub
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            :to="'/convert'"
            min-width="164"
            rel="noopener noreferrer"
            variant="text"
          >
            <v-icon
              icon="mdi-swap-horizontal"
              size="large"
              start
            />
            Convert to and from npub
          </v-btn>
        </v-col>
      </v-row>
      
      </v-sheet>
    </v-row>
    </v-responsive>

  </v-container>
</template>

<script>
    import VueWriter from "vue-writer";
    import ProfileCard from './childComponents/ProfileCard.vue'
    export default {
        name: 'HomeView',
        components: {
          VueWriter,
          ProfileCard
        },
        setup() {

        },
        data: function() {
            return {
                name: "homeview",

            };
        },
        mounted: function() {
 
        },
        methods: {

        }
    }
</script>


