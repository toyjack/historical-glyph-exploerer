<script setup lang="ts">
import { ExtractComponentData,  BarChart } from 'vue-chart-3';
import { storeToRefs } from 'pinia'
import { useGlyphStore } from '@/stores/glyphs'

const glyphStore = useGlyphStore()
const { dateChart, dates,glyphs } = storeToRefs(glyphStore)

const labels = [...new Set(glyphs.value.map(i => Number(i.date)))].sort((a,b)=>a-b)
const hdicData = labels.map(i => {
  return glyphs.value.filter(item=> item.data_source=='hdic' && item.date==i).length || 0
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
console.log({labels,hdicData,hngData,uthiData,nijilData})
const yearsData = {
  labels,
  // labels: dateChart.value.map(i => Number(i.x) === i.x && i.x % 1 === 0 ? i.x : ""),
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
// https://stackoverflow.com/a/57434224
// const yearsData = {
//   labels: dateChart.value.map(i => i.x ),
//   // labels: dateChart.value.map(i => Number(i.x) === i.x && i.x % 1 === 0 ? i.x : ""),
//   datasets: [
//     {
//       label: 'HDIC',
//       data: dateChart.value.map(i => i.label == 'hdic' ? i.y : 0),
//       backgroundColor: 'green'
//     },
//     {
//       label: 'HNG',
//       data: dateChart.value.map(i => i.label == 'hng' ? i.y : 0),
//       backgroundColor: 'pink'
//     },
//     {
//       label: 'UTHI',
//       data: dateChart.value.map(i => i.label == 'uthi' ? i.y : 0),
//       backgroundColor: 'purple'
//     },
//     {
//       label: 'NIJIL',
//       data: dateChart.value.map(i => i.label == 'nijil' ? i.y : 0),
//       backgroundColor: 'orange'
//     },
//   ],
// }

// const dateArr = glyphs.value.filter(({ data_source }) => data_source === 'hdic').reduce( (obj, v)=> {
//   // increment or set the property
//   // `(obj[v.status] || 0)` returns the property value if defined
//   // or 0 ( since `undefined` is a falsy value
//   obj[v.date] = (obj[v.date] || 0) + 1;
//   // return the updated object
//   return obj;
//   // set the initial value as an object
// }, {})

// console.log( {dateArr})
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
    <BarChart :chartData="yearsData" :options="options" />
  </div>
</template>