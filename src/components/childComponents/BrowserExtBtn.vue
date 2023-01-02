<template>
    <v-btn @click="getPkFromExt()" v-if="!this.loggedInPk" variant="outlined">Connect Nos2x

    </v-btn>
    <div v-if="this.loggedInPk">
        <v-btn @click="logOut()" color="red" icon="mdi-logout" variant="text">
        </v-btn>
        <span class="text-body-2">{{  this.loggedInProfile.refData.name || this.loggedInProfile.npub.slice(0,10) + '...' }}</span>
    </div>

</template>


<script>
    
    import {Store} from '@/store/index.js'
    import {storeToRefs} from 'pinia'
    import {ref, reactive, watch} from 'vue'
    //import {PostItem} from "./PostItem"
    export default {
        name: 'BrowserExtBtn',
        components: {
         
        },
        props:{},
        setup() {
            const store = Store()
            const { loggedInPk, loggedInProfile } = storeToRefs(store)
            const {  } = store
                
            return {
                loggedInPk,
                loggedInProfile,
                store
            }
        },
        data: function() {
            return {
          

            };
        },
        watch: {
            loggedInPk (newValue, oldValue) {
                if(this.loggedInPk) {
                    this.loggedInProfile = this.store.getProfile(this.loggedInPk)
                }
            }
        },
        mounted: function() {
  
        },
        methods: {
            async getPkFromExt() {
                try{
                    this.loggedInPk = await window.nostr.getPublicKey()
                } catch(e){}
            },
            logOut() {
                this.loggedInPk = null
                this.loggedInProfile = null
            }
        }

    }
</script>