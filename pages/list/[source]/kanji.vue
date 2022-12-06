<script setup lang="ts">
import bushu from "~~/assets/json/radicals.json"

const route = useRoute()
const source = route.params.source || ""
const selected = ref("")

if (route.path.split("/")[3]) {
  selected.value = decodeURI(route.path.split("/")[3])
}


function changeSelected() {
  return navigateTo({
    path: '/list/' + source + "/kanji/" + selected.value,
  })
}

</script>

<template>
  <div class="container mx-auto">
    <div class="form-control w-full max-w-xs p-1 md:p-3">
      <label class="label">
        <span class="label-text">部首を選ぶ</span>
      </label>
      <select class="select select-primary max-w-xs" v-model="selected" @change="changeSelected()">
        <option disabled selected value=''>部首</option>
        <option v-for="option in bushu" :value="option.radical">
          [{{ option.stroke }}画] {{ option.radical }} 
        </option>
      </select>
    </div>

    <NuxtPage />
  </div>
</template>