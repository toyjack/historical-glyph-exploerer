<script setup lang="ts">
const route = useRoute()
const source = route.params.source || ""

const selected = ref("")
if (route.path.split("/")[3]) {
  selected.value = decodeURI(route.path.split("/")[3])
}

function changeSelected() {
  return navigateTo({
    path: '/list/'+source +"/" + selected.value,
  })
}
</script>

<template>
  <div class="container mx-auto">
    <div class="form-control w-full max-w-xs p-1 md:p-3">
      <label class="label">
        <span class="label-text">表示する内容</span>
      </label>
      <select class="select select-primary max-w-xs" v-model="selected" @change="changeSelected()">
        <option disabled selected value=''>文字種類を選ぶ</option>
        <option value="kana">かな</option>
        <option value="kanji">漢字</option>
      </select>
    </div>
  
    <NuxtPage />
  </div>
</template>