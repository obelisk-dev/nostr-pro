import {
    relayInit,
    generatePrivateKey,
    getPublicKey,
    getEventHash,
    signEvent
  } from 'nostr-tools'

import EventEmitter from 'eventemitter3'

const relayUrls = [
    "wss://nostr-pub.wellorder.net",
    "wss://relay.damus.io",
    "wss://relay.nostr.pro"
]

export class RelayPool extends EventEmitter {

    constructor(_relayUrls = relayUrls) {
      super()
      this.relayUrls = _relayUrls
      this.pool = []
      //this.subs = []
      this.connectedRelays = 0
      try {
        this.pool = this.relayUrls.map(relayInit)
      } catch(e) {console.log(e)}
    }

    async connectAll () {
      return new Promise((resolve, reject) => { 
        setTimeout(() => {
          //resolve
          resolve(this.connectedRelays)
        }, 3000);
        
        for ( const relay of this.pool ) {
          try {
            relay.connect()
            relay.on('connect', () => {
                  this.connectedRelays++
                  this.emit('connect',{url:relay.url})
                }
              )
          } catch(e) {console.log('error on connect')}
        }
      })//end promise
    }//end connect

    closeAll () {
        this.pool.forEach(relay => {
          try {
            relay.close()
          } catch(e) {console.log('error on close')}
        })
    }

    subAll (_query = [], _subId = null, _closeOnEose = true, _timeOut = 3000) {
      //keep all returned event hashes so we dont return repeats
      return new Promise((resolve, reject) => { 
        let returnedEventIds = []
        let events = []
        let subs = []
        // send results after timeout and unsub all
        console.log('here')
        setTimeout(() => {
          //unsub all
          // subs.forEach(sub => {
          //   try {
          //     console.log('unsub')
          //     sub.unsub()
          //   } catch(e) {}
          // })
          //resolve
          resolve(events)
        }, _timeOut);
        console.log(this)
        this.pool.forEach(relay => {
          try {
            let sub = relay.sub(_query)
            subs.push(sub)
            //onevent
            sub.on('event', _event => {
              
              if(_event && _event.hasOwnProperty('id') && !returnedEventIds.includes(_event.id)) {
                returnedEventIds.push(_event.id)
                events.push(_event)
                this.emit('event', {url:relay.url, subId:_subId, event:_event})
              } else {
                console.log('dupe or no event id')
              }
            })
            //oneose
            sub.on('eose', () => {
              this.emit('eose', {url:relay.url, subId:_subId})
              if(_closeOnEose) {
                try {
                  console.log('unsub')
                  sub.unsub()
                } catch(e) {}
              }
            })
          } catch(e) {console.log('suball', e)}
        })//end foreach
      
      })//end promise
      
    }
  
  }