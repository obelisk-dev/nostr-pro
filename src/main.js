/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import SearchNpubBar from '@/components/childComponents/SearchNpubBar.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.component("SearchNpubBar", SearchNpubBar);
registerPlugins(app)

app.mount('#app')
