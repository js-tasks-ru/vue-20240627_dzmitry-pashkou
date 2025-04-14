import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const maxNum = 5
    const minNum = 0
    let currentNum = ref(0)

    return {
      minNum,
      maxNum,
      currentNum,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="currentNum--"
        :disabled="minNum >= currentNum"
      >➖</button>
      <span class="count" data-testid="count">{{currentNum}}</span>
      <button
        class="button button--secondary"
        type="button"
        @click="currentNum++"
        aria-label="Increment"
        :disabled="maxNum <= currentNum"
      >➕</button>
    </div>
  `,
})
