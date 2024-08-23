import { computed, defineComponent, onMounted, ref } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const pages = [1, 2, 3, 4, 5]
    const currentPage = ref(1)
    const meetups = ref(null)

    const newPage = computed(() => {
      newMeetup(currentPage.value)
      return currentPage
    })

    const newMeetup = async id => {
      meetups.value = await getMeetup(id)
    }

    onMounted(async () => {
      try {
        meetups.value = await getMeetup(1)
      } catch (error) {
        console.error(error)
      }
    })

    return {
      pages,
      meetups,
      currentPage,
      newPage,
      newMeetup,
    }
  },

  template: `
    <div class="meetup-selector">
    <template v-if="meetups">
    </template>

      <div class="meetup-selector__control">
        <button @click="currentPage--" class="button button--secondary" type="button" :disabled="currentPage <= 1">Предыдущий</button>
        <div v-for="page in pages" class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              :id="'meetup-id-' + page"
              class="radio-group__input"
              type="radio"
              name="meetup-radio"
              :value="page"
              v-model="currentPage"
            />
            <label :for="'meetup-id-' + page" class="radio-group__label">{{ page }}</label>
          </div>
        </div>

        <button @click="currentPage++" class="button button--secondary" type="button" :disabled="currentPage >= pages.length">Следующий</button>
      </div>

      <template v-if="meetups">
        <div class="meetup-selector__cover">
          <div class="meetup-cover">
            <h1 class="meetup-cover__title">{{ meetups.title }}</h1>
          </div>
        </div>
      </template>

    </div>
  `,
})
