import { Store } from '../store/index.js'
import { RelayPool } from './nostr.js'
import { reactive } from 'vue'
import { formatDuration } from '@/helpers/timeSince' 

export class Post {

    constructor( event, loadProfile = true ) {

        this.event = event
        this.refData = reactive({date:new Date(this.event.created_at * 1000), moment:'', likes:'', replies:''})
        this.date = new Date(this.event.created_at * 1000)
        this.refData.moment = (formatDuration(Date.now() - this.date)) || 'Now'

        this.profile = null
        if (loadProfile) {
            try {
                this.getProfile()
            } catch(e) {}
        }

        this.replies = []
        this.isReply = false
        this.rootId = ''
        this.replyId = ''
        this.eTags = []
        this.pTags = []
        this.rootTag = []
        this.tagType = ''
        this.sortTags()
        console.log(this)
    }
    getProfile() {
        const store = Store()
        this.profile = store.getProfile(this.event.pubkey)
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
    sortTags() {
        try {
            if (this.event.tags.length < 1) {
                this.tagType = 'preferred'
                return
            }
            console.log("tags", this.event.tags, this.event)
            this.event.tags.forEach(tag => {
                if (tag[0] == 'e') {
                    this.isReply = true
                    this.eTags.push(tag)
                    try {
                        if(tag.length >= 4) {
                            
                            if(tag[3] == 'reply') {
                                this.tagType = 'preferred'
                                this.replyId = tag[1]
                            } 
                            if(tag[3] == 'root') {
                                this.tagType = 'preferred'
                                this.rootId = tag[1]
                                this.rootTag = tag
                            }    
                        }
                    } catch(e) {console.log(e)}
                } else if(tag[0] == 'p') {
                    this.pTags.push(tag)
                }
            })
            if(this.tagType == 'preferred') return  //we are done and tag is in preferred format, if not lets try deprecated
            if (this.eTags.length > 0) {
                this.tagType = 'deprecated'
                try {
                    this.rootId = this.eTags[0][1]
                    this.rootTag = this.eTags[0]
                } catch(e) {console.log(e)}
            } 
            if (this.eTags.length > 1) {
                this.tagType = 'deprecated'
                try {
                    this.replyId = this.eTags[this.eTags.length - 1][1]
                } catch(e) {console.log(e)}
            }
        } catch(e){console.log(e)}

    }

}