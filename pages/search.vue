<script setup lang="ts">
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

import { storeToRefs } from 'pinia'
import { useSettingStore } from "@/stores/settings"
import { useGlyphStore } from "@/stores/glyphs"

const settingStore = useSettingStore()
const { variants_checked, hdic_checked, hng_checked, uthi_checked, nijil_checked } = storeToRefs(settingStore)
const glyphStore = useGlyphStore()
const {dates} = storeToRefs(glyphStore)

const route = useRoute()
const urlHanzi = route.params.hanzi as string

const hanzi = ref(urlHanzi)
const yearRange = ref([506,1013])
const yearRangeMin = ref(506)
const yearRangeMax = ref(1013)
const yearRangeMarks = ref([506, 1013])

function move() {
  return navigateTo({
    path: `/search/${hanzi.value}`,
  })
}
</script>

<template>
  <div class="container mx-auto w-full flex flex-col md:flex-row pt-2">
    <div class="flex md:w-1/4 flex-col md:items-end p-1">
      <div class="flex  justify-between gap-2">
        <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs"
          v-model="hanzi" />
        <button class="btn btn-primary" @click="move">検索</button>
      </div>

      <div class="">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">異体字</span>
            <input type="checkbox" class="toggle toggle-primary" :checked="variants_checked" />
          </label>
        </div>
      </div>

      <div class="flex flex-row justify-between">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">HDIC</span>
            <input type="checkbox" :checked="hdic_checked" class="checkbox checkbox-accent" />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">HNG</span>
            <input type="checkbox" :checked="hng_checked" class="checkbox checkbox-secondary" />

          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">HIUT</span>
            <input type="checkbox" :checked="uthi_checked" class="checkbox checkbox-primary" />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">NIJIL</span>
            <input type="checkbox" :checked="nijil_checked" class="checkbox checkbox-error" />
          </label>
        </div>
      </div>

      <div class="divider"></div>
      <div class="flex flex-col w-full">
        <div class="form-control w-full max-w-md">
          <label class="label">
            <span class="label-text">出典を選ぶ</span>
          </label>
          <select class="select select-primary select-bordered">
            <option disabled selected>選択</option>
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </div>

        <div class="pt-10 px-2">
          <label class="label">日付範囲（年）</label>
          <div class="pt-2">
            <vue-slider v-model="yearRange" :min="yearRangeMin" :max="yearRangeMax" :enable-cross="false" :marks="yearRangeMarks"/>
          </div>
        </div>

      </div>
    </div>

    <div class="flex-1 flex-col md:w-3/4">
      <NuxtPage />
    </div>
  </div>
</template>