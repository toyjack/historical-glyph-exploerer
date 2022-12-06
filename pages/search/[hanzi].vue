<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlyphStore } from '@/stores/glyphs'
import { useSettingStore } from '@/stores/settings'

const glyphStore = useGlyphStore()
const settingStore = useSettingStore()
const { glyphs, pending, sortedByDate  } = storeToRefs(glyphStore)
const { ifShowChart } = storeToRefs(settingStore)

const route = useRoute()
const hanzi = route.params.hanzi as string

if (hanzi && glyphs.value.length===0) {
  glyphStore.fetchAll(hanzi)
}

function year(yearNum:number){
  if (yearNum==9999 || isNaN(yearNum)) return "Unknown"
  else return yearNum
}
onUpdated(() => {
  // console.log(sortedByDate.value)
})

</script>

<template>
  <div>
    <div className="flex justify-center" v-if="pending">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
    <div v-else>
      <YearsChart v-if="ifShowChart" />

      <div class="divider">検索結果: {{ glyphs.length }}</div>
      <!-- <div>{{glyphs}}</div> -->
      
      <div class="flex flex-wrap">
        <div v-for="item of sortedByDate"
          class="rounded-sm shadow-lg w-1/3 md:w-1/6 flex flex-col justify-between p-1 md:p-2 bg-white border hover:border-blue-300 hover:border-2">
          <a :href="'/glyph/' + item.id" class="cursor-pointer flex flex-col  justify-between" target="blank">
            <img :src="item.thumbnail_url" alt="" loading="lazy" class="w-full items-center justify-start">
          </a>
          <!-- TODO: fix the ugly data_source class -->
          <p class="leading-normal text-gray-100 text-center opacity-30"
            :class="{ 'bg-primary': item.data_source == 'uthi', 'bg-error': item.data_source == 'nijil', 'bg-accent': item.data_source == 'hdic', 'bg-secondary': item.data_source == 'hng' }">
            <a :href="item.source_virewer_link">
              [{{ year(item.date)}}]{{ item.book_name }}
            </a>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>