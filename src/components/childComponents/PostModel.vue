<template>
    <v-btn @click="this.show = true"> Create New Post</v-btn>
    <v-dialog
        v-model="show"
        transition="dialog-top-transition"
        max-width="600px"
        width="100%"
    >
      <v-card class="py-2 px-2 ma-4">
        <v-card-title class = "text-h5">
            Create new post
        </v-card-title>
        <v-textarea
            counter
            v-model="text"
            class="px-2 pt-2 text-body-2"
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="text-body-1"
            variant="text"
            @click="this.show = false; this.resetVars()"
          >
            Close
          </v-btn>
          <v-btn
            class="text-body-1"
            variant="tonal"
            color="primary"
            :disabled="this.isPosting"
            @click="this.post()"
          >
            Post
            <v-progress-circular
              v-if="this.isPosting"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- success snackbar -->
    <v-snackbar
      vertical
      v-model="successSnackbar"
      :timeout="3000"
      color="success"
      elevation="20"
    >
      <v-span class="text-body-1">
        {{ snackBarText }}
      </v-span>

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar = false"
          class="text-body-2"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
    import {getEventHash} from 'nostr-tools'
    import {Store} from '@/store/index.js'
    import {storeToRefs} from 'pinia'
    import {ref, reactive, watch} from 'vue'
    //import {PostItem} from "./PostItem"
    export default {
        name: 'PostModel',
        components: {
         
        },
        props:{
            type: String,
        },
        setup() {
            const store = Store()
            const { loggedInPk, loggedInProfile, showPostModel } = storeToRefs(store)
            const {  } = store
                
            return {
                loggedInPk,
                loggedInProfile,
                showPostModel,
                store
            }
        },
        data: function() {
            return {
                show:false,
                text:"",
                successSnackbar:false,
                seen:0,
                isPosting:false,
                snackBarText:''
            };
        },
        watch: {
            seen(newValue,oldValue) {
              this.snackBarText = "Your post has been seen on " + this.seen + " relays."
            }

        },
        mounted: function() {
  
        },
        methods: {
          async post () {
            this.seen = 0
            if (this.text.length < 1) return
            if (!this.loggedInPk) return
            this.isPosting = true
            try {
              let _event = this.createEvent(this.text)
              _event.id = getEventHash(_event)
              _event = await window.nostr.signEvent(_event)
              this.store.relayPool.on('ok', ({url, id}) => {
                this.isPosting = false
                this.text = ''
                this.show = false
              })
              this.store.relayPool.on('seen', ({url, id}) => {
                this.successSnackbar = true
                this.seen++ 
              })
              this.store.relayPool.publishAll(_event)
            } catch(e){ this.resetVars(); this.show = false }
          },
          createEvent(text) {
            return ({
              kind: 1,
              pubkey: this.loggedInPk,
              created_at: Math.floor(Date.now() / 1000),
              tags: [],
              content: text
            })
          },
          resetVars() {
            this.text = ""
            this.show = false
            this.seen = 0
            this.isPosting = false

          }

        }

    }
</script>

<style lang="scss">
  @import "../../sass/variables.scss";
</style>