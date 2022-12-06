<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingStore } from "@/stores/settings"
import { useGlyphStore } from '@/stores/glyphs';
// TODO: move to api
import variants from "@/assets/json/variants.json"

const glyphStore = useGlyphStore()
const settingStore = useSettingStore()
const { variants_checked, hdic_checked, hng_checked, uthi_checked, nijil_checked, ifOnlyDelegate, ifShowChart } = storeToRefs(settingStore)

const route = useRoute()
const urlHanzi = route.params.hanzi as string

const hanzi = ref(urlHanzi)

const idsTerm = ref('')
const idsResults = ref<string[]>([])

const variantList = computed(()=>{return variants[hanzi.value]})

// TODO: fix duplicated data
function move(hanzi: string) {
  glyphStore.fetchAll(hanzi)
  return navigateTo({
    path: `/search/${hanzi}`,
  })
}

async function idsfind(ids: string) {
  const {data} = await useFetch(`/api/idsfind`,{
    method: 'GET',
    query: {
      term: ids
    }
  })
  
  idsResults.value=data.value.results
}

function updateHanzi(char :string) {
  hanzi.value=char
}
</script>

<template>
  <div class="container mx-auto w-full flex flex-col md:flex-row pt-2">
    <div class="flex md:w-1/4 flex-col md:items-end p-1">
      <!-- IDS Panel -->
      <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
        <input type="checkbox" />
        <div class="collapse-title text-l font-medium">
          IDS検索
        </div>
        <div class="collapse-content">
          <!-- input group -->
          <div class="form-control">
            <div class="input-group">
              <input type="text" placeholder="部品と残り画数を入力..." class="input input-bordered w-full" v-model="idsTerm" />
              <button class="btn btn-square bg-primary" @click="idsfind(idsTerm)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          <!-- results -->
          <div>
            <span v-for="char of idsResults" class="cursor-pointer hover:underline hover:bg-primary hover:text-white" @click="updateHanzi(char)">{{char}}</span>
          </div>
        </div>
      </div>

      <div class="flex  justify-between gap-2 pt-2">
        <input type="text" placeholder="ここに入力" class="input input-bordered input-primary w-full max-w-xs"
          v-model="hanzi" />
        <button class="btn btn-primary" @click="move(hanzi)">検索</button>
      </div>

      <div class="pt-2 md:w-72">
        <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
          <input type="checkbox" />
          <div class="collapse-title text-l font-medium">
            関連漢字
          </div>
          <div class="collapse-content">
            <!-- list  -->
            <span class="cursor-pointer hover:bg-primary hover:text-white" v-for="item of variantList" @click="move(item)">{{item}}</span>
            
          </div>
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

      <div class="flex">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">代表字のみ</span>
            <input type="checkbox" class="toggle toggle-primary" v-model="ifOnlyDelegate" />
          </label>
        </div>
      
        <!-- <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">異体字</span>
                  <input type="checkbox" class="toggle toggle-primary" v-model="variants_checked" />
                </label>
              </div> -->
      </div>

      <div class="divider"></div>

      <div class="flex-1">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">年代分布表</span>
            <input type="checkbox" class="toggle toggle-primary" v-model="ifShowChart" />
          </label>
        </div>
      </div>

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

