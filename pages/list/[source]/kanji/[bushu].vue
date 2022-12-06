<script setup lang="ts">
import hng from '@/assets/json/hng_kanji_list.json'
import nijil from '@/assets/json/nijil_kanji_list.json'
import uthi from '@/assets/json/uthi_kanji_list.json'

const route = useRoute()
const source = route.params.source
const bushu = route.params.bushu

let kanjiList
if (source === 'hng') {
  kanjiList = hng
} else if (source === 'nijil') {
  kanjiList = nijil
} else if (source === 'uthi') {
  kanjiList = uthi
}

const filterdList = kanjiList.filter(item => item.radical == bushu)


</script>

<template>
  <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-y-1 md:gap-1 p-1 md:p-3">
    <div v-for="item of filterdList"
      class="rounded-sm item-center text-center p-2 bg-white border-2 cursor-pointer hover:underline hover:bg-primary hover:text-white">
      <NuxtLink :to="'/search/' + item.char">{{ item.char }}</NuxtLink>
    </div>
  </div>
</template>