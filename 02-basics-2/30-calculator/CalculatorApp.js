import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const num1 = ref(10)
    const num2 = ref(2)
    const MathOperator = ref('sum')
    const result = computed(() => {
      if (MathOperator.value === 'sum') {
        return num1.value + num2.value
      }
      if (MathOperator.value === 'subtract') {
        return num1.value - num2.value
      }
      if (MathOperator.value === 'multiply') {
        return num1.value * num2.value
      }
      if (MathOperator.value === 'divide') {
        return num1.value / num2.value
      }
    })

    return {
      MathOperator,
      num1,
      num2,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input v-model="num1" type="number" aria-label="First operand"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="MathOperator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="MathOperator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="MathOperator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="MathOperator"/>➗</label>
      </div>

      <input v-model="num2" type="number" aria-label="Second operand"/>

      <div>=</div>

      <output>{{result}}</output>
    </div>
  `,
})
