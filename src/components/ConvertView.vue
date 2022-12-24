<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex justify-center text-center fill-height">
            <v-row class="justify-center fill-height">
                <v-sheet 
                    rounded='xl'
                    elevation="10"
                    class="py-8 px-2 fill-height ma-4"
                    max-width="1000px"
                    width="100%"
                >
                
                <h4 class="text-h4 text-primary">
                    Public key converter
                </h4>
                <div class="py-6" />
                
                <v-row >
                    <v-col class="">
                        <v-text-field 
                            label="Hex or Npub" 
                            variant="outlined"
                            :color="this.outline"
                            class="ma-2"
                            hint="paste in a hex or npub public key to convert"
                            v-model="input"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col class="">
                        <v-card variant="outlined" :text="this.output" class="ma-2">

                        </v-card>
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
        name: 'ConvertView',
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
            input: 'convert'
        },
       
        mounted: function() {
          
        },
        methods: {
            convert() {
                try {
                    let lcinput = this.input.toLocaleLowerCase()
                    this.ln = lcinput.length
                    console.log(this.ln)
                    if (this.ln < 60) throw ('too short')
                    if (lcinput.substring(0,4) === 'npub')  {
                        let {type, data} = nip19.decode(lcinput)
                        this.output = (type === 'npub' && data) ? data : ''
                        this.inputType = 'Npub'
                        this.outputType = 'Hex'
                        this.outline = 'green'
                    } else {
                        let npub = nip19.npubEncode(lcinput)
                        this.output = npub
                        this.outputType = 'Npub'
                        this.inputType = 'Hex'
                        this.outline = 'green'
                    }
                } catch (e) {this.outline = "red", this.output = ''}
            }

        }

    }
</script>