<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingStore } from "@/stores/settings"
import { useGlyphStore } from '~~/stores/glyphs';

const glyphStore = useGlyphStore()
const settingStore = useSettingStore()
const { variants_checked, hdic_checked, hng_checked, uthi_checked, nijil_checked, ifOnlyDelegate } = storeToRefs(settingStore)

const route = useRoute()
const urlHanzi = route.params.hanzi as string

const hanzi = ref(urlHanzi)

// TODO: fix duplicated data
function move(hanzi: string) {
  glyphStore.fetchAll(hanzi)
  return navigateTo({
    path: `/search/${hanzi}`,
  })
}
</script>

<template>
  <div class="container mx-auto w-full flex flex-col md:flex-row pt-2">
    <div class="flex md:w-1/4 flex-col md:items-end p-1">
      <div class="flex  justify-between gap-2">
        <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs"
          v-model="hanzi" />
        <button class="btn btn-primary" @click="move(hanzi)">検索</button>
      </div>

      <div class="flex">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">代表字のみ</span>
            <input type="checkbox" class="toggle toggle-primary" v-model="ifOnlyDelegate" />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">異体字</span>
            <input type="checkbox" class="toggle toggle-primary" v-model="variants_checked" />
          </label>
        </div>
      </div>

      <div class="flex flex-row justify-between">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">HDIC</span>
            <input type="checkbox" v-model="hdic_checked" class="checkbox checkbox-accent" />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">HNG</span>
            <input type="checkbox" v-model="hng_checked" class="checkbox checkbox-secondary" />

          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">HIUT</span>
            <input type="checkbox" v-model="uthi_checked" class="checkbox checkbox-primary" />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">NIJIL</span>
            <input type="checkbox" v-model="nijil_checked" class="checkbox checkbox-error" />
          </label>
        </div>
      </div>

      <!-- <div class="divider"></div> -->

      <!-- <div class="flex flex-col w-full">
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

      </div> -->
    </div>

    <div class="flex-1 flex-col md:w-3/4">
      <NuxtPage />
    </div>
  </div>
</template>

