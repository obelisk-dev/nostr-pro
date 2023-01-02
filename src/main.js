/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import SearchNpubBar from '@/components/childComponents/SearchNpubBar.vue'
import PostModel from '@/components/childComponents/PostModel.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.component("SearchNpubBar", SearchNpubBar);
app.component("PostModel", PostModel);

registerPlugins(app)

app.mount('#app')
