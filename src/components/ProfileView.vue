<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex text-left fill-height" >
            <v-row class="py-4" justify="space-around">
                <v-col class="" cols=7>
                    <v-card  variant="outlined" class="fill-height py-2 px-4" >
                        <v-card-title class="pb-4">
                            <h4 class="text-h4 font-weight-bold " font-color="white">Feed</h4>
                        </v-card-title>
                        <v-divider heavy></v-divider>
                        <v-list height= '700px' style="overflow-y:auto; background-color:#121212">

                    
                            <v-list-item v-for= "n in 100"  class="px-4 w-100 ">
                            <template v-slot:prepend>
                                <v-avatar
                                    color="grey-darken-3"
                                    image="https://heish.net/img/heish.jpg"
                                    size="60"
                                ></v-avatar>
                            </template>

                            <v-list-item-title class="text-primary"><strong>Heish </strong>~ jan 1, 09</v-list-item-title>
                            <v-list-item-subtitle>npub53jgkl3j54klj643</v-list-item-subtitle>
                            <div>Here is a post about nothing Here is aHere is a post about nothing Here iHere is a post about nothing Here iHere is a post about nothing Here iHere is a post about nothing Here iHere is a post about nothing Here iHere is a post about nothing Here i</div>
                            <div class="my-1"></div>
                            <div class="text-right">32<v-icon size="20">mdi-heart</v-icon>   32<v-icon size="20">mdi-reply</v-icon></div>
                           
                            <div class="my-2"></div>
                            <v-divider ></v-divider>
                            </v-list-item>
                        </v-list>

                    </v-card>
                </v-col>
                <v-col cols=4>
                    <ProfileCard/>
                </v-col>
            </v-row>
        </v-responsive>
    </v-container> 
</template>
  
<script>
    import ProfileCard from './childComponents/ProfileCard.vue'
    export default {
        name: 'ProfileView',
        components: {
        ProfileCard
        },
        props:{id:String},
        setup() {

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

  
  