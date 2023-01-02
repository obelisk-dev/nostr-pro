import { Store } from '../store/index.js'
import { RelayPool } from './nostr.js'
import { reactive } from 'vue'
import { formatDuration } from '@/helpers/timeSince' 

export class Post {

    constructor( event ) {
        this.event = event
        this.isReply = false
        this.refData = reactive({date:new Date(this.event.created_at * 1000), moment:'', likes:0, replies:0})
        this.date = new Date(this.event.created_at * 1000)
        this.refData.moment = (formatDuration(Date.now() - this.date)) || 'Now'
        const store = Store()
        this.profile = store.getProfile(event.pubkey)
        this.replies = []

    }
    async getLikes(relayPool) {
        let _subId = 'getInteractions-'+this.event.id
        let _query =[{
                        kinds: [7],
                        '#e': [this.event.id],
                        limit: 100
                    }]
        relayPool.on('event', ({event, subId}) => {
            if(event && _subId === subId) {
                try{
                    if(event.kind=='7') // && event.content == "+"  ?????????
                        {
                            console.log('like', event.content)
                            this.refData.likes++
                        }
                }catch(e) {console.log(e)}
            }
        })
        const reactions = await relayPool.subAll(_query, _subId, true, 8000, true)
        this.refData.likes = reactions.length
    }
    async getReplies(relayPool) {
        let _subId = 'getReplies-'+this.event.id
        let _query =[{
                        kinds: [1],
                        '#e': [this.event.id],
                        limit: 100
                    }]
        relayPool.on('event', ({event, subId}) => {
            if(event && _subId === subId) {
                try{
                    this.refData.replies++
                }catch(e) {console.log(e)}
            }
        })
        this.replies = await relayPool.subAll(_query, _subId, true, 8000, true)
        this.refData.replies = this.replies.length
    }

}