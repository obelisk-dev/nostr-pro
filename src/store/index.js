import {defineStore}  from 'pinia'
import { RelayPool } from '../utils/nostr.js'
import {nip19, generatePrivateKey, getPublicKey} from 'nostr-tools'
import { Profile } from '@/utils/Profile'
import { Post } from '@/utils/Post'
import {ref } from 'vue'

export const Store = defineStore('Store', {
  state: () => ({
    relayPool: null,
    connectedRelays: 0,
    loggedInPk: null,
    sidePanelVis: false,
    profiles:{}, //{'pK1':'Profile1', pk2:Profile2, ...}   
    posts:{}, //{'eventId1':Post, 'eventId2:{event2}, ...}
  }),
  
  getters: {
    // hasStoredProfile (pk) {
    //   return this.profiles.hasOwnProperty(pk)
    // },
    // hasStoredPost (id)  {
    //   return this.posts.hasOwnProperty(id)
    // },
    // getProfileByPk(pk) {
    //   if(!hasStoredProfile(pk)) {return false}
    //   try {
    //     return(this.profiles[pk])
    //   } catch(e) { return false}
    // },
    // getPostByEventid(id) {
    //   if(!hasStoredPost(id)) {return false}
    //   try {
    //     return(this.posts[pk])
    //   } catch(e) { return false}
    // }
  },

  actions: {

    async createRelayPool() {
        try {
            this.connectedRelays = 0
            this.relayPool = new RelayPool()
            this.relayPool.on('connect', ()=>{this.connectedRelays++})
            this.connectedRelays = await this.relayPool.connectAll()
        } catch(e) {}
        return (this.connectedRelays)

    },//end createRelay

    getProfile(pk) {
      //if profile doesnt exist create one and add it.
      if(!this.profiles.hasOwnProperty(pk)) {
        const profile = new Profile(pk)
        console.log("CREATING NEW PROFILE")
        profile.getProfile(this.relayPool)
        this.profiles[pk] = profile
        return profile
      } else {
        console.log("USING OLD PROFILE")
        return (this.profiles[pk])
      }
    },

    getPost(event) {
      //if profile doesnt exist create one and add it.
      try{
        let eventId = event.id
        let pubkey = event.pubkey
        if(!this.posts.hasOwnProperty(eventId)) {
          console.log("CREATING NEW POST")
          const post = new Post(event, this.getProfile(pubkey))
          //post.getProfile(this.relayPool)
          this.posts[eventId] = post
          return post
        } else {
          console.log("USING OLD POST")
          return (this.posts[eventId])
        }
      } catch(e) {}
    },

    addPost (id, post) {
      this.posts[id] = post
    },
  }//end actions
})


