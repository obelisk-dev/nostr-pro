

<template>
    
    <v-text-field
        hide-details
        single-line
        label="Npub or hex public key to view a profile."
        v-model="this.input"
        @keydown.enter="search()"
    ></v-text-field>

</template>

<script>
    import { nip19 } from 'nostr-tools'
    import router from '@/router'
    export default {
        name: 'SearchNpubBar',
        components: {

        },
        data: function() {
            return {
                input:'',
                output:''
            };
        },
        watch: {
    
        },
        mounted: function() {
            
        },
        methods: {

            search() {             
                try {
                    let lcinput = this.input.toLocaleLowerCase()
                    let ln = lcinput.length
                    this.input = ''
                    if (ln < 60) throw ('too short')
                    if (lcinput.substring(0,4) === 'npub')  {
                        let {type, data} = nip19.decode(lcinput)
                        this.output = (type === 'npub' && data) ? data : ''
                        router.push({ path: '/p/'+this.output })
                    } else {
                        router.push({ path: '/p/'+lcinput })
                    }
                } catch (e) {console.log(e)}
            }



        }

    }
</script>