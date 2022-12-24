<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex justify-center text-center fill-height">
            <v-row class="justify-center fill-height">
                <v-sheet 
                    outlined
                    rounded 
                    elevation="3"
                    class="py-8 px-2 fill-height"
                    max-width="1000px"
                    width="100%"
                >
                <!-- contents -->
                </v-sheet>
                feed
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script>
    import { ref } from 'vue'
    import { relayPool } from '../utils/nostr'
    export default {
        name: 'feed',
        setup() {
            const pool = new relayPool()
            pool.connectAll()
            pool.on('connect', ({url}) => console.log('connected: ' + url))
            setTimeout(() => {
                pool.subAll(
                    [{
                        kinds: [1],
                        authors: ['0cd556fe22df9d6ca951af418a615592d81366c6759eaeaf5b7a990516a3b4b1']
                    }]
                )
                pool.on('event', ({url , subId, event}) => console.log('event', event))

            }, 3000);
        
        return {
            pool
        }
        },
        components: {

        },
        data: function() {
            return {

            };
        },
        watch: {
    
        },
        mounted: function() {
            console.log('here')
            console.log(this.pool)
          
        },
        methods: {
            hi () {
                console.log('tet')
                
            }


        }


    }
</script>