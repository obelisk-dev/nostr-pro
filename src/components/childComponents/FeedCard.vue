<template>
    <v-card  variant="outlined" class="fill-height py-2 px-4 text-left" >
        <v-card-title class="pb-4">
            <h4 class="text-h4 font-weight-bold " font-color="white">Feed</h4>
        </v-card-title>
        <!-- <v-divider heavy></v-divider>
        <v-tabs
            v-model="tab"
            grow
        >
            <v-tab
                :key="item"
                :value="item"
            >
                Post
            </v-tab>
            <v-tab
                :key="item"
                :value="item"
            >
                Reply
            </v-tab>
        </v-tabs> -->
        <v-divider heavy></v-divider>
        <v-list height= '700px' style="overflow-y:auto; background-color:#121212">
            <PostItem v-for="post in postArray" :post = post></PostItem>
        </v-list>
    </v-card>
</template>

<script>
    import {ref} from 'vue'
    import {Store} from '@/store/index.js'
    import {storeToRefs} from 'pinia'
    import {Profile} from '@/utils/Profile'
    import PostItem from './PostItem.vue'
    //import { ProfileCard} from './ProfileCard.vue'
    export default {
        name: 'FeedCard',
        components: {
            PostItem
        },
        props:{type:String, pk:String},
        
        setup(props){
            const store = Store()
            
            return {
                store
            }   
        },
        data: function() {
            return {
                postArray:[],
                subs:[]
            };
        },
        watch: {
    
        },
        mounted: function() {
            switch(this.type) {
                case "profile":
                    this.getProfileFeed()
                    break;
            }
          
        },
        unmounted: function() {
            this.unSubComponentSubs()
        },
        methods: {
            async getProfileFeed () {
                let _query = [{
                         kinds: [1],
                         authors: [this.pk],
                         limit: 20
                     }]
                let _subId = 'profileFeed-' + this.pk
                this.subs.push(_subId)
                this.store.relayPool.on('event', ({event, subId}) => {
                    if(event && _subId === subId) {
                        try{
                            this.addEventToPostArray(event)
                        }catch(e){}
                    }
                })
                this.store.relayPool.subAll(_query, _subId, false, 300000, true)
                //results gathered after timeout
                
                //results gathered before timeout
                // result.forEach(event => {
                //     try{
                //         this.addEventToPostArray(event)
                //     }catch(e){}
                // });
            },//end getProfilefeed
            addEventToPostArray(event) {
                try{
                    this.postArray.unshift(this.store.getPost(event,true))
                    this.postArray.sort((a, b) => parseFloat(b.event.created_at) - parseFloat(a.event.created_at));
                    // if(this.postArray > 200) {
                    //     this.postArray.splice(200)
                    // }
                } catch(e) {console.log(e)}
            },
            unSubComponentSubs() {
                try{
                    this.subs.forEach(subId => {
                        this.store.relayPool.unSub(subId)
                    });
                } catch(e) {}
            }

        },

    }
</script>