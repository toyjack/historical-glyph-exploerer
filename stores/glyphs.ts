import { defineStore } from 'pinia'
import { UthiBody } from '@/types/UthiBody'
import { Nijil } from '@/types/Nijil'
import { Hutime } from '@/types/Hutime'
import { Hng } from '@/types/HNG'
import { HdicSyp, HdicKtb } from '@/types/Hdic'
import NijilBooks from '@/assets/json/nijil_book.json'

interface Glyph {
  id: string,
  data_source: string,
  date: number,
  date_jpn: string,
  book_name: string,
  thumbnail_url: string,
  manifest_url: string,
  source_virewer_link: string,
  creator: string,
  rights: string,
  rights_url: string
}
export const useGlyphStore = defineStore('glyphs', {
  state: () => ({
    glyphs: <Glyph[]>[],
    pending: false,
    occupations: <string[]>[],
    divisions: <string[]>[],
    dates: <string[]>[],
    dates_jpn: <string[]>[],
  }),
  actions: {
    async fetchData(character: string) {
      this.$reset()
      await this.fetchHdic(character)
      await this.fetchHng(character)
      // await this.fetchAPI(character, 1)
      // await this.fetchNijil(character, true)
      if (this.glyphs) {
        await this.convAllYear()
      }
    },
    async fetchHdic(kanji: string) {
      // tsj
      // https://viewer.hdic.jp/api/tsj/search?entry=%E4%BD%9B&def=
      // https://viewer.hdic.jp/api/v1/tsj/search?entry=%E4%BA%AC&def=
      // https://viewer.hdic.jp/api/v1/tsj/imgurl?entry=%E4%BA%AC
      // const tsjEntryUrl =`https://viewer.hdic.jp/api/v1/tsj/search?entry=${kanji}&def=`
      // const { data: tsjEntry, error:tsjEntryError } = await useFetch(tsjEntryUrl, { initialCache: false, server: false })
      const tsjImgUrlFetchUrl = `https://viewer.hdic.jp/api/v1/tsj/imgurl?entry=${kanji}`
      const { data: tsjImgUrl, error: tsjImgUrlError } = await useFetch(tsjImgUrlFetchUrl, { initialCache: false, server: false })
      // TODO: error check
      // if (!tsjImgUrlError){
      const glyph: Glyph = {
        id: "HDIC_TSJ_" + kanji,
        data_source: "hdic",
        date: 898,
        date_jpn: "昌泰元年",
        book_name: "天治本新撰字鏡",
        thumbnail_url: tsjImgUrl.value,
        manifest_url: "",
        source_virewer_link: "",
        creator: "",
        rights: "",
        rights_url: ""
      }
      this.glyphs.push(glyph)
      // }


      // syp
      // https://viewer.hdic.jp/api/v1/syp/search?entry=%E4%BD%9B&def=
      // https://viewer.hdic.jp/img/syp/a025a074
      const sypEntryUrl = `https://viewer.hdic.jp/api/v1/syp/search?entry=${kanji}&def=`
      const { data: sypEntry, error: sypEntryError } = await useFetch<HdicSyp[]>(sypEntryUrl, { initialCache: false, server: false })
      for (const item of sypEntry.value) {
        const sypImgUrl = `https://viewer.hdic.jp/img/syp/${item.SYID}`
        const glyph: Glyph = {
          id: "HDIC_SYP_" + kanji,
          data_source: "hdic",
          date: 1013,
          date_jpn: "",
          book_name: "宋本玉篇",
          thumbnail_url: sypImgUrl,
          manifest_url: "",
          source_virewer_link: "",
          creator: "",
          rights: "",
          rights_url: ""
        }
        this.glyphs.push(glyph)
      }
      // ktb
      // https://viewer.hdic.jp/api/v1/ktb/search?entry=%E4%BD%9B&def=
      // https://viewer.hdic.jp/img/ktb/1_052_A13.jpg
      const ktbEntryUrl = `https://viewer.hdic.jp/api/v1/ktb/search?entry=${kanji}&def=`
      const { data: ktbEntry, error: ktbEntryError } = await useFetch<HdicKtb[]>(ktbEntryUrl, { initialCache: false, server: false })
      for (const item of ktbEntry.value) {
        const ktbImgUrl = `https://viewer.hdic.jp/img/ktb/${item.TBID}.jpg`
        const glyph: Glyph = {
          id: "HDIC_KTB_" + kanji,
          data_source: "hdic",
          date: 1114,
          date_jpn: "",
          book_name: "高山寺本篆隷万象名義",
          thumbnail_url: ktbImgUrl,
          manifest_url: "",
          source_virewer_link: "",
          creator: "",
          rights: "",
          rights_url: ""
        }
        this.glyphs.push(glyph)
      }

    },
    async fetchHng(kanji: string) {
      // https://search.hng-data.org/api/v2/search/character/%E4%BA%AC
      const fetchUrl = `https://search.hng-data.org/api/v2/search/character/${kanji}`
      const { data } = await useFetch<Hng>(fetchUrl, { initialCache: false, server: false })
      const resultList = data.value["list"]
      resultList.forEach(item => {
        // console.log(item[0])
        // TODO: fix array in array
        const glyph: Glyph = {
          id: item[0].id,
          data_source: "hng",
          date: item[0].source.date,
          date_jpn: "",
          book_name: item[0].source.name,
          thumbnail_url: item[0].thumbnail_url,
          manifest_url: item[0].manifest_url,
          source_virewer_link: item[0].link,
          creator: item[0].creator,
          rights: item[0].rights,
          rights_url: item[0].rights_url
        }
        this.glyphs.push(glyph)
      })
    },
    async fetchNijil(kanji: string, delegate = "false") {
      const fetchUrl = `https://lab.nijl.ac.jp/jikei/api/char/search?delegate=${delegate}&limit=-1&q=${kanji}`
      const { data } = await useFetch<Nijil>(fetchUrl, { initialCache: false, server: false })
      const resultList = data.value["list"]
      resultList.forEach(item => {
        const foundDate = parseInt(NijilBooks.find(book => book.book_id == item.source.bid).date, 10);
        const glyph: Glyph = {
          id: item.id,
          data_source: "nijil",
          date: foundDate,
          date_jpn: "",
          book_name: item.source.title,
          thumbnail_url: item.thumbnail_url,
          manifest_url: item.manifest_url,
          source_virewer_link: item.link,
          creator: item.creator,
          rights: item.rights,
          rights_url: item.rights_url
        }
        this.glyphs.push(glyph)
      })
    },
    async fetchAPI(hanzi: string, position = 1, delegate = 0) {
      const fetchUrl = `https://clioapi.hi.u-tokyo.ac.jp/shipsapi/v1/W34/character/${hanzi}?delegate=${delegate}&position=${position.toString()}`
      const { data } = await useFetch<UthiBody>(fetchUrl, { initialCache: false, server: false })

      const resultList = data.value["list"]
      const resultNum = data.value.search_results as number

      resultList.forEach(item => {
        let call_number = item.source.call_number.replace('@ja', '')
        let callNum1, callNum2, callNum3
        [callNum1, callNum2, callNum3] = call_number.split('-')
        callNum1 = callNum1.replace("貴", "_000ki_")

        // trim
        let date_jpn_formated = item.source.date.replace('@ja', '').trim()
        // zenkaku
        date_jpn_formated = zenkakuConv(date_jpn_formated)
        // remove sigh
        date_jpn_formated = date_jpn_formated.replace(/[〔〕（）\(\)]/g, '')

        const glyph: Glyph = {
          id: item.id,
          data_source: "uthi",
          date: null,
          date_jpn: date_jpn_formated,
          book_name: item.source.value.replace('@ja', ''),
          thumbnail_url: item.thumbnail_url,
          manifest_url: item.manifest_url,
          source_virewer_link: `https://clioimg.hi.u-tokyo.ac.jp/viewer/view/idata/000/${callNum1}/${callNum2}/${callNum3}/${item.source.page}?ci=1&kts=2&dts=34&mts=${item.id}`,
          creator: item.creator.replace('@ja', ''),
          rights: item.rights,
          rights_url: item.rights_url
        }
        this.glyphs.push(glyph)
      })

      if (resultNum > 99) {
        position += 100
        await this.fetchAPI(hanzi, position)
      }
    },
    async addGlyph(glyph) {
      let date = glyph.source.date
      if (date) {
        // trim
        date = date.trim()
        // zenkaku
        date = zenkakuConv(date)
        // remove sigh
        date = date.replace(/[〔〕（）\(\)]/g, '')

        glyph.source.date = date

        if (!this.dates.includes(date)) {
          this.dates.push(date)
        }
      }

      const occupation = glyph.source.occupation
      if (occupation && !this.occupations.includes(occupation)) {
        this.occupations.push(occupation)
      }

      const division = glyph.source.division
      if (division && !this.divisions.includes(division)) {
        this.divisions.push(division)
      }

      this.glyphs.push(glyph)
    },
    async convAllYear() {
      let datesToConv: string[] = []
      for (let glyph of this.glyphs) {
        const date_jpn = glyph.date_jpn
        if (date_jpn) {
          datesToConv.push(date_jpn)
        }
      }
      // console.log(this.glyphs.length)
      // console.log(datesToConv)

      let results = await convYearList(datesToConv)

      // let dates = [... new Set(Object.values(results))].sort()
      // this.dates = dates


      for (let glyph of this.glyphs) {
        // すでに西暦あるやつを飛ばす
        if (glyph.date) continue

        let date = results[glyph.date_jpn]
        if (date) {
          // [C.E. 1578]歴代亀鑑(五四通)
          date = date.replace("C.E. ", "");
          glyph.date = parseInt(date, 10)
        }
        else
          glyph.date = 9999
      }

      // TODO: move to single function
      let dates = this.glyphs.map(glyph => {
        if (typeof (glyph.date) == "string") {
          return parseInt(glyph.date, 10)
        } else {
          return glyph.date
        }
      })
      dates = [... new Set(Object.values(dates))].sort()
      if (dates[dates.length - 1] === null) {
        dates.pop()
      }
      dates = dates.filter(Number)
      dates.sort((a, b) => {
        a - b
      })
      this.dates = dates
    }
  },
  getters: {
    sortedByDate(state) {
      return state.glyphs.sort((a, b) => a.date - b.date)
    }
  }
})


function zenkakuConv(str) {
  return str.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
}

async function convYearList(dates: string[]): Promise<{ [key: string]: string }> {
  const fetchUrl = "https://ap.hutime.org/cal"
  const body = {
    "jsonrpc": "2.0",
    "method": "conv",
    "params": {
      "ical": "1001.1",
      "ocal": "101.1",
      "otype": "year",
      "ival": dates.join('\n')
    }
  }
  const { data } = await useFetch<Hutime>(fetchUrl, {
    method: "post",
    body: body,
    pick: ['result'],
  })

  let results = {}
  for (const [index, item] of dates.entries()) {
    const ceDate = data.value.result[index]?.text
    if (ceDate) {
      // const dateNum = ceDate.replace(/\D/g, "");
      // results[item] = parseInt(dateNum, 10)
      results[item] = ceDate
    }
    else
      results[item] = "Unknown"
  }

  return results
}

// TODO
// catagory: time(computed from date), division, occupation
//  book(value, callnumber), documet, send, to