import {
    relayInit,
    generatePrivateKey,
    getPublicKey,
    getEventHash,
    signEvent
  } from 'nostr-tools'

import EventEmitter from 'eventemitter3'

const relayUrls = [
  "wss://relay.damus.io",
  "wss://nostr-relay.wlvs.space",
  "wss://nostr.fmt.wiz.biz",
  "wss://relay.nostr.bg",
  "wss://nostr.oxtr.dev",
  "wss://nostr.v0l.io",
  "wss://nostr-2.zebedee.cloud",
]

export class RelayPool extends EventEmitter {

    constructor(_relayUrls = relayUrls) {
      super()
      this.relayUrls = _relayUrls
      this.pool = []
      this.subs = {}
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

    subAll (_query = [], _subId = null, _closeOnEose = true, _timeOut = 1, _closeAllOnTimeout = false) {
      //keep all returned event hashes so we dont return repeats
      return new Promise((resolve, reject) => { 
        let returnedEventIds = []
        let events = []
        this.subs[_subId] = []
        // send results after timeout and unsub all
        setTimeout(() => {
          //unsub all
          if(_closeAllOnTimeout){
            this.unSub(_subId)
          }
          //resolve
          resolve(events)
        }, _timeOut);
        this.pool.forEach(relay => {
          try {
            let sub = relay.sub(_query)
            this.subs[_subId].push(sub)
            //onevent
            sub.on('event', _event => {
              if(_event && _event.hasOwnProperty('id') && !returnedEventIds.includes(_event.id)) {
                returnedEventIds.push(_event.id)
                events.push(_event)
                this.emit('event', {url:relay.url, subId:_subId, event:_event})
              } else {
                //console.log('dupe or no event id')
              }
            })
            //oneose
            sub.on('eose', () => {
              this.emit('eose', {url:relay.url, subId:_subId})
              if(_closeOnEose) {
                try {
                  console.log('unsub-'+_subId)
                  sub.unsub()
                } catch(e) {}
              }
            })
          } catch(e) {console.log(e)}
        })//end foreach
      
      })//end promise
      
    }

    unSub(_subId) {
      try {
        this.subs[_subId].forEach(sub => {
          try {
              console.log('unsub'+_subId)
              sub.unsub()
            } catch(e) {}
        })
      } catch(e) {}
    }

  }