import {Store} from '../store/index.js'
import { RelayPool } from './nostr.js'
import { reactive } from 'vue'
import { formatDuration } from '@/helpers/timeSince' 

export class Post {

    constructor( event, profile ) {
        this.event = event
        this.isReply = false
        this.refData = reactive({date:new Date(this.event.created_at * 1000), moment:''})
        this.date = new Date(this.event.created_at * 1000)
        this.refData.moment = (formatDuration(Date.now() - this.date)) || 'Now'
        this.profile = reactive(profile)
    }

}