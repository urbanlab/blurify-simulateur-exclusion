import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDistanceStore = defineStore('distance', () => {
  const distance = ref(0)

  return { distance }
})
