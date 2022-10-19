<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { storeToRefs } from 'pinia'
import { useGlyphStore } from '@/stores/glyphs'

const glyphStore = useGlyphStore()
const { glyphs } = storeToRefs(glyphStore)

const labels = [...new Set(glyphs.value.map(i => Number(i.date)))].sort((a, b) => a - b)
const hdicData = labels.map(i => {
  return glyphs.value.filter(item => item.data_source == 'hdic' && item.date == i).length || 0
})
const hngData = labels.map(i => {
  return glyphs.value.filter(item => item.data_source == 'hng' && item.date == i).length || 0
})
const uthiData = labels.map(i => {
  return glyphs.value.filter(item => item.data_source == 'uthi' && item.date == i).length || 0
})
const nijilData = labels.map(i => {
  return glyphs.value.filter(item => item.data_source == 'nijil' && item.date == i).length || 0
})
console.log({ labels, hdicData, hngData, uthiData, nijilData })
const yearsData = {
  labels,
  datasets: [
    {
      label: 'HDIC',
      data: hdicData,
      backgroundColor: 'green'
    },
    {
      label: 'HNG',
      data: hngData,
      backgroundColor: 'pink'
    },
    {
      label: 'UTHI',
      data: uthiData,
      backgroundColor: 'purple'
    },
    {
      label: 'NIJIL',
      data: nijilData,
      backgroundColor: 'orange'
    },
  ],
}

const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
}

</script>

<template>
  <div>
    <Bar :chart-options="options" :chart-data="yearsData"  />
  </div>
</template>