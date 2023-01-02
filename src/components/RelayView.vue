<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex justify-center text-center fill-height">
            <v-row class="justify-center ">
                <v-sheet 
                    rounded='xl'
                    elevation="10"
                    class="py-8 px-2  ma-4"
                    max-width="1000px"
                    width="100%"
                >
                
                    <h4 class="text-h4 text-primary">
                        My Relays
                    </h4>
                    <div class="py-6" />
                    
                    <v-row >
                        <v-col cols="6">
                            <v-table theme="dark">
                            <thead>
                            <tr>
                                <th class="text-left">
                                RELAY URL
                                </th>
                                <th class="text-left">
                                CONNECTED
                                </th>
                                <th class="text-left">
                                REMOVE
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="item in desserts"
                                :key="item.name"
                            >
                                <td>{{ item.name }}</td>
                                <td>{{ item.calories }}</td>
                            </tr>
                            </tbody>
                        </v-table>      
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script>
    import {nip19, generatePrivateKey, getPublicKey} from 'nostr-tools'
    export default {
        name: 'RelayView',
        components: {

        },
        data: function() {
            return {
                outline:"white",
                input:'',
                output:'',
                inputType:'',
                outputType:'',
                ln:0
            };
        },
        watch: {
      
        },
       
        mounted: function() {
          
        },
        methods: {
            

        }

    }
</script>