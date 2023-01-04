<template>
    <v-container class="fill-height" :key="this.id" max-width="600px" width="100%">
        <v-responsive class="d-flex text-left fill-height" >
            <v-row no-gutters class="py-4" justify="center" >
                <v-timeline side="end">
                    <v-timeline-item size="large" v-for="post in this.threadPostArray">
                    <template v-slot:icon>
                        <v-avatar size="60" :image="post.profile.refData.picture" ></v-avatar>
                    </template>
                    <v-card class="elevation-2" :max-width="isMobile? '250px':'450px'" width="100%">
                        <v-card-title class="text-h5 text-primary">
                            {{ post.profile.refData.name }}
                            <span class="text-body-2"> ~ {{ post.refData.moment }}</span>
                        </v-card-title>
                        <v-card-subtitle>
                            {{ post.profile.npub }}
                        </v-card-subtitle>
                        <v-card-text>
                            {{ post.event.content }}
                        </v-card-text>
                    </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-row>
        </v-responsive>
    </v-container> 
</template>
<PostItem></PostItem>
  
<script>
    import ProfileCard from './childComponents/ProfileCard.vue'
    import FeedCard from './childComponents/FeedCard.vue'
    import {Store} from '../store/index.js'
    import {storeToRefs} from 'pinia'
    import {Profile} from '../utils/Profile'
    import { useDisplay } from 'vuetify'
    //import {PostItem} from '@/childComponents/PostItem.vue'
    //import {ref, watch} from 'vue'
    export default {
        name: 'ThreadView',
        components: {
        },
        props:{
            id:String
        },
        setup(props) {
            const store = Store()
            const { mobile } = useDisplay()
            const isMobile = mobile.value
            //check for stored profile - if none then create one and store it
            //const profile = store.getProfile(props.pk)

            return {
                store,
                isMobile
            }   
        },
        data: function() {
            return {
                maxThreadSize:10,
                threadPostArray:[],
                threadSize:0

            };
        },

        watch:{
  
        },
        mounted: function() {
            this.getThread(this.id)

        },
        methods: {
            //recursive Method to get full thread starting with any eventId that is a reply
            getThread(id) {
        
                this.loading = true
                let _subId = 'getEvent-'+id+Date.now().toString()
                let _query = [
                    {
                        ids: [id],
                        limit: 1
                    }
                ]
                this.store.relayPool.on('event', ({event, subId}) => {
                    if(event && _subId === subId) {
                        this.store.relayPool.unSub(subId)
                        try{
                            let post = this.store.getPost(event,true)
                            this.threadPostArray.unshift(post)
                            this.threadSize++
                            if (post.isReply && this.threadSize<this.maxThreadSize) {
                                this.getThread(post.replyId || post.rootId)
                            }
                            //console.log(this.threadPostArray)
                        }catch(e){}
                    }
                })
                const ret = this.store.relayPool.subAll(_query,_subId,true,10000,true)

            }//end getThread
        }
    }
</script>

  