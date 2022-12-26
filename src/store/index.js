import {defineStore}  from 'pinia'
import { RelayPool } from '../utils/nostr.js'
import {nip19, generatePrivateKey, getPublicKey} from 'nostr-tools'

export const Store = defineStore('Store', {
  state: () => ({
    relayPool: null,
    connectedRelays: 0,
    loggedInPk: null,
    profiles:{}, //{'pK1':'eventid1', pk2:eventid2, ...}   
    events:{}, //{'eventId1':{event1}, 'eventId2:{event2}, ...}

    


  }),
  
  getters: {
    getProfileByPk(pk) {
      try {
        return(this.profiles[pk])
      } catch(e) { return false}
    }
  },

  actions: {

    async createRelayPool() {
        try {
            console.log(this.connectedRelays)
            this.connectedRelays = 0
            this.relayPool = new RelayPool()
            this.relayPool.on('connect', ()=>{console.log('e'), this.connectedRelays++})
            this.connectedRelays = await this.relayPool.connectAll()
        } catch(e) {}
        return (this.connectedRelays)

    },//end createRelay
    

  }
})

