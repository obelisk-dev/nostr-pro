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
    import {Store} from '../store/index.js'
    import {storeToRefs} from 'pinia'
    //import { RelayPool } from '../utils/nostr'
    export default {
        name: 'feed',
        async setup() {
            const store = Store()
            //const { relayPool } = storeToRefs(store)
            //console.log(store.relayPool)
            let res = await store.relayPool.subAll(
                     [{
                         kinds: [1],
                         authors: ['0cd556fe22df9d6ca951af418a615592d81366c6759eaeaf5b7a990516a3b4b1']
                     }]
                 )
            console.log(res)
            // const pool = new relayPool()
            // pool.connectAll()
            // pool.on('connect', ({url}) => console.log('connected: ' + url))
            // setTimeout(() => {
            //     let res = pool.subAll(
            //         [{
            //             kinds: [1],
            //             authors: ['0cd556fe22df9d6ca951af418a615592d81366c6759eaeaf5b7a990516a3b4b1']
            //         }]
            //     )
            //     console.log('1', res)
            //     pool.on('event', ({url , subId, event}) => console.log('event', event))
                
            // }, 3000);
        
        return {
            store,
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
            // console.log(this.pool)
          
        },
        methods: {
            hi () {
                console.log('tet')
                
            }


        }


    }
</script>