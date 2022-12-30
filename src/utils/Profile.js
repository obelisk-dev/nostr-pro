
import { reactive } from 'vue'
import { nip19 } from 'nostr-tools'
export class Profile {    
    constructor(pk) {
        this.pk = pk
        try{
            this.npub = nip19.npubEncode(this.pk)
        } catch(e) {}
        this.name = ''
        this.about = ''
        this.picture = ''
        this.refData = reactive({name:'',about:'',picture:''})
        this.event = null
    }   

    getProfile (relayPool) {
        let _subId = 'getProfile-'+this.pk
        let _query =[{
                        kinds: [0],
                        authors: [this.pk],
                        limit: 1
                    }]
        relayPool.on('event', ({event, subId}) => {
            if(event && _subId === subId) {
                this.event = event
                try{
                    this.setProperties(event.content)
                }catch(e) {console.log(e)}
            }
        })
        relayPool.subAll(_query, _subId, true, 10000, true)
    }

    setProperties (content) {
        let jsonContent = JSON.parse(content)
        this.name, this.refData.name = jsonContent.name
        this.about, this.refData.about = jsonContent.about
        this.picture, this.refData.picture = jsonContent.picture
    }
}