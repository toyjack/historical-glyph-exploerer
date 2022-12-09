<script setup lang="ts">
const route = useRoute()
const source = route.params.source
const allKana = ["い", "ろ", "は", "に", "ほ", "へ", "と", "ち", "り", "ぬ", "る", "を", "わ", "か", "よ", "た", "れ", "そ", "つ", "ね", "な", "ら", "む", "う", "ゐ", "の", "お", "く", "や", "ま", "け", "ふ", "こ", "え", "て", "あ", "さ", "き", "ゆ", "め", "み", "し", "ゑ", "ひ", "も", "せ", "す", "ん",]
</script>

<template>
  <div>
    <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-y-1 md:gap-1 p-1 md:p-3">
      <div v-for="item of allKana"
        class="rounded-sm item-center text-center p-2 bg-white border-2 cursor-pointer hover:underline hover:bg-primary hover:text-white">
        <NuxtLink :to="'/search/' + item">{{ item }}</NuxtLink>
      </div>
    </div>
  </div>
</template>