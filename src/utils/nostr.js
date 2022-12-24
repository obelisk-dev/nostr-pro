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

export class relayPool extends EventEmitter {

    constructor(_relayUrls = relayUrls) {
      super()
      this.relayUrls = _relayUrls
      this.pool = []
      this.subs = []
      this.connectedRelays = 0
      try {
        this.pool = this.relayUrls.map(relayInit)
      } catch(e) {console.log(e)}
    }

    async connectAll () {
        for await ( const relay of this.pool ) {
          try {
            await relay.connect()
            relay.on('connect', () => {
                  this.connectedRelays++
                  this.emit('connect',{url:relay.url})
                }
              )
          } catch(e) {console.log('error on connect')}
        }
    }

    closeAll () {
        this.pool.forEach(relay => {
          try {
            relay.close()
          } catch(e) {console.log('error on close')}
        })
    }

    subAll (_query = [], _subId = null, _closeOnEose = true) {
      //keep all returned event hashes so we dont return repeats
      let returnedEvents = []
      let subs = []

      this.pool.forEach(relay => {
        try {
          console.log(_query)
          let sub = relay.sub(_query)
          subs.push(sub)
          //onevent
          sub.on('event', _event => {
            if(_event && _event.hasOwnProperty('id') && !returnedEvents.includes(_event.id)) {
              returnedEvents.push(_event.id)
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
      })
    }
  
  }