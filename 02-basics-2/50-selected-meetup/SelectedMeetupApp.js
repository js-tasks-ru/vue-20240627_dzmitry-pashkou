import { computed, defineComponent, onMounted, ref } from 'vue'
import { getMeetup } from './meetupsService.ts'

const inCart = (state, getters) => id => (getters.index(id) ? -1 : '')

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetup = ref([])
    const currentSlide = ref(1)

    const resultSlide = computed(() => {
      return currentSlide
    })

    onMounted(async () => {
      try {
        for (let i = 1; i <= 5; i++) meetup.value.push(await getMeetup(i))
      } catch (error) {
        console.error(error)
      }
    })

    return {
      meetup,
      currentSlide,
      resultSlide,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button @click="currentSlide--" class="button button--secondary" type="button" :disabled="currentSlide <= 1">Предыдущий</button>
        <div class="radio-group" role="radiogroup">
          <div v-for="page of meetup" class="radio-group__button">
            <input
              :id="'meetup-id-' + page.id"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="page.id"
              v-model="currentSlide"
            />
            <label :for="'meetup-id-' + page.id" class="radio-group__label">{{ page.id }}</label>
          </div>
        </div>

        <button @click="currentSlide++" :disabled="currentSlide >= meetup.length" class="button button--secondary" type="button">Следующий</button>
      </div>
      <div v-for="(slide, index) of meetup" v-show="index === currentSlide - 1" class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ slide.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
