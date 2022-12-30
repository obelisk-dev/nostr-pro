

<template>
    
    <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        label="Enter Npub public key"
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
                        router.push({ path: '/profile/'+this.output })
                    } else {
                        router.push({ path: '/profile/'+lcinput })
                    }
                } catch (e) {console.log(e)}
            }



        }

    }
</script>