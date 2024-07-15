import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'
const app = document.getElementById('app')
const App = defineComponent({
  name: 'App',

  setup() {
    const event = new Date()
    const options = {
      dateStyle: 'long',
    }
    const DATE = event.toLocaleDateString('en-EN', options)

    return {
      DATE,
    }
  },

  template: `
        <div>Сегодня {{ DATE }}</div>
    `,
})

createApp(App).mount(app)
