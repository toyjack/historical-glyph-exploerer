<script setup lang="ts">
  
</script>
<template>
  <div class="flex flex-col h-screen">
    <header class="bg-gradient-to-r from-fuchsia-400 to-violet-800 flex flex-col justify-between">
      <div class="flex flex-row justify-between px-2 pt-7 pb-2 md:p-20 ">
        <div class="flex flex-col">
          <h6 class="text-sm md:text-xl text-white">歴史資料・古典籍の字形探索</h6>
          <h3 class="text-left text-xl md:text-3xl font-serif text-white  uppercase">
            <NuxtLink to="/" class="hover:underline">Historical Glyph Explorer</NuxtLink>
          </h3>
        </div>
        <div class="pt-4 pr-1 flex flex-row">
          <!-- <LangButton /> -->
        </div>
      </div>

      <div class="tabs md:px-20">
        <NuxtLink class="tab tab-lifted" to="/" activeClass="tab-active">ホーム</NuxtLink>
        <NuxtLink class="tab tab-lifted" to="/search" activeClass="tab-active">検索</NuxtLink>
        <NuxtLink class="tab tab-lifted" to="/list" activeClass="tab-active">リスト</NuxtLink>
        <NuxtLink class="tab tab-lifted" to="/about" activeClass="tab-active">アバウト</NuxtLink>
      </div>
    </header>

    <section class="flex-grow">
      <slot />
    </section>

    <footer
      class="bg-gradient-to-r from-fuchsia-400 to-violet-800 text-white flex flex-col items-center justify-center">
      <div class="text-sm md:text-base pt-5 md:pt-4 text-center">
        ソースの著作権は字形のページで表示します
      </div>
      <div class="text-sm md:text-base p-2 md:p-4">Copyright 2022 <a href="https://researchmap.jp/liuguanwei"
          target="blank" class="underline">Guanwei Liu</a></div>
    </footer>
  </div>
</template>