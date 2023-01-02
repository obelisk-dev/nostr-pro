<template>
    <v-list-item class="px-4 w-100 ">
        <template v-slot:prepend>
                <v-avatar
                    color="grey-darken-3"
                    :image="this.post.profile.refData.picture"
                    size="60"
                    @click="this.goToProfile"
                    style="cursor: pointer"
                ></v-avatar>
        </template>
        <v-list-item-title class="text-primary">
            <strong>{{ this.post.profile.refData.name }} </strong> ~ 
            <span>
                {{ this.post.refData.moment }}
                <v-tooltip
                    activator="parent"
                    location="end"
                >
                    {{ this.post.refData.date }}
                </v-tooltip>
            </span>
        </v-list-item-title>
        <v-list-item-subtitle>{{ this.post.profile.npub }}</v-list-item-subtitle>
        <div>{{ this.post.event.content }}</div>
        <div class="my-1"></div>
        <div class="text-right">
            {{ this.post.refData.likes +" "}}<v-icon size="20" color="red">mdi-heart-outline</v-icon>
            {{ this.post.refData.replies +" "}}<v-icon size="20">mdi-reply-outline</v-icon>
        </div>
        <div class="my-2"></div>
        <v-divider ></v-divider>
    </v-list-item>
</template>

<script>
    import { Post } from '@/utils/Post'
    import  router  from '@/router'
    export default {
        name: 'PostItem',
        props:{
            post: Post
        },
        setup() {

        },
        data: function() {
            return {

            };
        },
        watch: {
    
        },
        mounted: function() {
          
        },
        methods: {
            goToProfile(){
                router.push({ path: '/profile/'+this.post.profile.pk })
            }
        }

    }
</script>