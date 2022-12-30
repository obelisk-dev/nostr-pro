<template>
    <v-container class="fill-height" :key="this.pk">
        <v-responsive class="d-flex text-left fill-height" >
            <v-row no-gutters class="py-4" justify="center">
                <v-col :cols="isMobile ? '12':'6'" >
                    <FeedCard type="profile" :pk=pk></FeedCard>
                </v-col>
                <v-col :cols="isMobile ? '12':'3'" >
                    <ProfileCard :pk=pk></ProfileCard>
                </v-col>
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
        name: 'profile',
        components: {
            ProfileCard,
            FeedCard
        },
        props:{
            pk:String
        },
        setup(props) {
            const store = Store()
            const { mobile } = useDisplay()
            const isMobile = mobile.value
            //check for stored profile - if none then create one and store it
            const profile = store.getProfile(props.pk)

            return {
                isMobile
            }   
        },
        data: function() {
            return {


            };
        },

        watch:{
  
        },
        mounted: function() {

        },
        methods: {

        }
    }
</script>

  
  