<template>
    <v-card v-if="this.profile" variant="outlined" class="py-8 px-4 text-center">
        <v-avatar
            class="white--text text-center"
            size="160"
            :image=this.profile.refData.picture
        >
        </v-avatar>
        <v-card-title>{{ this.profile.refData.name }}</v-card-title>
        <v-card-subtitle>{{ this.profile.npub }}</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text class="text-wrap" style="white-space: pre;"> <Strong>BIO </Strong><br/> {{ this.profile.refData.about }}</v-card-text>
        <v-divider></v-divider>
        <div class="py-4"></div>
        <v-row v-if="this.loggedInPk != this.pk">
            <v-col cols="4">
                <v-btn disabled>Follow</v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn disabled>Message</v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn disabled>Block</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center" v-else-if="this.loggedInPk == this.pk">
            <PostModel></PostModel>
        </v-row>
        <PostItem></PostItem>
    </v-card>
</template>

<script>
    import {Store} from '@/store/index.js'
    import {storeToRefs} from 'pinia'
    import {Profile} from '@/utils/Profile'
    import {ref, reactive, watch} from 'vue'
    //import {PostItem} from "./PostItem"
    export default {
        name: 'ProfileCard',
        components: {
        },
        props:{pk:String},
        setup (props) {
            const store = Store()
            const { loggedInPk, loggedInProfile } = storeToRefs(store)
            //check for stored profile - if none then create one and store it
            const profile = store.getProfile(props.pk)
    
            return {
                profile,
                loggedInPk,
                store
            }
        },
        data: function() {
            return {

            };
        },
        
        mounted: function() {
  
        },
        methods: {


        }

    }
</script>