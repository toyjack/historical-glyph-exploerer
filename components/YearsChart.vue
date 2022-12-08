<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { storeToRefs } from 'pinia'
import { useGlyphStore } from '@/stores/glyphs'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const glyphStore = useGlyphStore()
const { sortedGlyphs: glyphs, chartLabels } = storeToRefs(glyphStore)

const hdicData = computed(()=>{
  return chartLabels.value.map(i => {
    return glyphs.value.filter(item => item.data_source == 'hdic' && item.date == i).length || 0
  })
})
const hngData = computed(()=>{
  return chartLabels.value.map(i => {
    return glyphs.value.filter(item => item.data_source == 'hng' && item.date == i).length || 0
  })
})
const uthiData = computed(()=>{
  return chartLabels.value.map(i => {
    return glyphs.value.filter(item => item.data_source == 'uthi' && item.date == i).length || 0
  })
})
const nijilData = computed(()=>{
  return chartLabels.value.map(i => {
    return glyphs.value.filter(item => item.data_source == 'nijil' && item.date == i).length || 0
  })
})

const yearsData = computed(()=>{
  return {
    labels: chartLabels.value,
    datasets: [
      {
        label: 'HDIC',
        data: hdicData.value,
        backgroundColor: 'green'
      },
      {
        label: 'HNG',
        data: hngData.value,
        backgroundColor: 'pink'
      },
      {
        label: 'UTHI',
        data: uthiData.value,
        backgroundColor: 'purple'
      },
      {
        label: 'NIJIL',
        data: nijilData.value,
        backgroundColor: 'orange'
      },
    ],
  }

})
const options = {
  responsive: true,
  aspectRatio:2,
  scales: {
    x: {
      stacked: true
    },
    y: {
      // stacked: true,
      ticks: {
        beginAtZero: true,
        callback: function (value, index, values) {
          // 整数のみ表示
          if (Math.floor(value) === value) {
            return value;
          }
        }
      }
    }
  }
}


</script>

<template>
  <div>
    <Bar :chart-options="options" :chart-data="yearsData"  />
  </div>
</template>