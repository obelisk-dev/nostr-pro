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
    loggedInProfile: null,
    sidePanelVis: false,
    profiles:{}, //{'pK1':'Profile1', pk2:Profile2, ...}   
    posts:{}, //{'eventId1':Post, 'eventId2:{event2}, ...}
  }),
  
  getters: {

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
        //console.log("CREATING NEW PROFILE")
        profile.getProfile(this.relayPool)
        this.profiles[pk] = profile
        return profile
      } else {
        //console.log("USING OLD PROFILE")
        return (this.profiles[pk])
      }
    },

    getPost(event, loadProfile = true, getReplies = true, getLikes = false) {
      //if profile doesnt exist create one and add it.
      try{
        let eventId = event.id
        if(!this.posts.hasOwnProperty(eventId)) {
          //console.log("CREATING NEW POST")
          const post = new Post(event, loadProfile)
          if(getLikes) {post.getLikes(this.relayPool)}
          if(getReplies) {post.getReplies(this.relayPool)}
          this.posts[eventId] = post
          return post
        } else {
          //console.log("USING OLD POST")
          return (this.posts[eventId])
        }
      } catch(e) {}
    },

    addPost (id, post) {
      this.posts[id] = post
    },

    getPostFromId (id) {
      let post = null
      try{
        post = this.posts[id]
      } catch(e){}
      return post
    }


  }//end actions
})


