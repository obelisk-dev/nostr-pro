/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '@/router'
// import relayPool from './nostrPool'

export function registerPlugins (app) {
  loadFonts()
  app.use(vuetify)
  app.use(router)
  //app.use(relayPool)
}
