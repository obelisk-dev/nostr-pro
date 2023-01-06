<template>
   
    <v-btn
        @click="show=true; this.getPost()"
        link
        variant="text"
        size="x-small"
        >
        Replied to...
    </v-btn>
    <v-dialog
        v-model="show"
        transition="dialog-top-transition"
        max-width="600px"
        width="100%"
    >
   
        <v-card width="300" class="ma-4">
          <v-list >
            <v-list-item v-if="this.post">
                <v-list-item-title class="text-body-1 text-primary">
                    <v-avatar
                        color="grey-darken-3"
                        :image="this.post.profile.refData.picture"
                        size="40"
                        @click="this.goToProfile"
                        style="cursor: pointer"
                    ></v-avatar>
                    {{ this.post.profile.refData.name }}
                </v-list-item-title>
                <div class="text-body-2">{{ this.post.event.content }}</div>
            </v-list-item>
          </v-list>
        </v-card> 
    </v-dialog>
</template>  

<script>
    //import PostItem from '@/components/childComponents/PostItem.vue'
    import { Post } from '@/utils/Post'
    import {Store} from '@/store/index.js'
    import  router  from '@/router'
    
    export default {
        name: 'ViewReplyPill',
        components:{
            //PostItem
        },
        props:{
            ReplyEventId: String
        },
        setup() {
            const store = Store()
            
            return {
                store
            }
        },
        data: function() {
            return {
                show:false,
                post:null,
                loading:false
            };
        },
        watch: {
    
        },
        mounted: function() {
          
        },
        methods: {
            goToProfile(){
                router.push({ path: '/p/'+this.post.profile.pk })
            },
            async getPost(){
                this.loading = true
                let _subId = 'getEvent-'+this.ReplyEventId
                let _query = [
                    {
                        ids: [this.ReplyEventId],
                        limit: 1
                    }
                ]
                this.store.relayPool.on('event', ({event, subId}) => {
                    if(event && _subId === subId) {
                        try{
                            this.post = this.store.getPost(event,true)
                            this.store.relayPool.unSub(subId)
                            this.loading = false
                        }catch(e){}
                    }
                })
                const ret = await this.store.relayPool.maxRelaySubAll(_query,_subId,true,5000,true)
                this.loading = false
            }
        }

    }
</script>