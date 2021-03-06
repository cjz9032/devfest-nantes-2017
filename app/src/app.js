import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import './components'
import VueApollo from 'vue-apollo'
import { createApolloClient } from './apollo'

// Global filters
for (const key in filters) {
  Vue.filter(key, filters[key])
}

export async function createApp (context) {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  // Apollo
  const apolloClient = createApolloClient(context)
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  })

  await store.dispatch('init')

  const app = new Vue({
    router,
    store,
    apolloProvider,
    ...App,
  })

  return {
    app,
    router,
    store,
    apolloProvider,
  }
}
