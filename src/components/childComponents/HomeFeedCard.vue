<template>
    <v-card  variant="outlined" class="fill-height py-2 px-4" >
        <v-card-title class="pb-4">
            <h4 class="text-h4" font-color="white">Global Feed</h4>
        </v-card-title>
        <v-divider heavy></v-divider>
        <v-list  height= '700px' style="overflow-y:auto; background-color:#121212">
            <PostItem :key=this.refreshKey v-for="post in postArray" :post = post></PostItem>
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
        name: 'HomeFeedCard',
        components: {
            PostItem
        },
        props:{pk:String},
        
        setup(props){
            const store = Store()
            
            
            return {
                store
            }   
        },
        data: function() {
            return {
                postArray:[],
                type:"global",
                refreshKey:0,
                subs:[]//array of subids to unsub from on unmount
            };
        },
        watch: {
    
        },
        mounted: function() {
            switch(this.type) {
                case "global":
                    this.getHomeFeed()
                    break;
            }
          
        },
        unmounted: function() {
            this.unSubComponentSubs()
        },
        methods: {
            async getHomeFeed () {
                let _query = [{
                         kinds: [1],
                         limit: 3,
                         since: Math.round(Date.now() / 1000) - 60000,
                     }]
                let _subId = 'globalFeed-'+Date.now().toString()
                this.store.relayPool.on('event', ({event, subId}) => {
                    if(event && _subId === subId) {
                        try{
                            this.addEventToPostArray(event)
                        }catch(e){}
                    }
                })
                this.subs.push(_subId)
                this.store.relayPool.subAll(_query, _subId, false, 360000, true)
                //results gathered after timeout
                
                //results gathered before timeout
                // result.forEach(event => {
                //     try{
                //         this.addEventToPostArray(event)
                //     }catch(e){}
                // });
                //console.log(this.postArray)
            },//end getProfilefeed
            addEventToPostArray(event) {
                try{
                    this.postArray.unshift(this.store.getPost(event))
                    // this.postArray.sort((a, b) => parseFloat(b.event.created_at) - parseFloat(a.event.created_at));
                    // if(this.postArray > 500) {
                    //     this.postArray.splice(500)
                    // }
                    //this.refreshKey++
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