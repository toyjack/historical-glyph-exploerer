import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    variants_checked: false,
    hdic_checked: true,
    hng_checked: true,
    uthi_checked: true,
    nijil_checked: true,
    ifShowFilter: true,
  }),
  actions: {
    increment() {
      this.count++
    },
  },
})