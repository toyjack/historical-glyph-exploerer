<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { storeToRefs } from 'pinia'
import { useGlyphStore } from '@/stores/glyphs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const glyphStore = useGlyphStore()
const { glyphs } = storeToRefs(glyphStore)

const labels = [...new Set(glyphs.value.map(i => {
  // handle the case where the year is unknown
  if (!i.date) return 9999
  return Number(i.date)
}))].sort((a, b) => a - b)

// const labels = Array.from(range(labels1[0], labels1[labels1.length - 2], 1))

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
// console.log({ labels, hdicData, hngData, uthiData, nijilData })
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

function* range(start, end, step) {
  while (start < end) {
    yield start;
    start += step;
  }
}

</script>

<template>
  <div>
    <Bar :chart-options="options" :chart-data="yearsData"  />
  </div>
</template>