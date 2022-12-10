import { Nijil } from "@/types/Nijil";
import { Glyph } from "@/types/Glyphs";
import { UthiBody } from "@/types/UthiBody";
import { Hutime } from "@/types/Hutime";
import { Hng } from "@/types/HNG";
import { HdicSyp, HdicKtb, HdicTsj } from "@/types/Hdic";
import NijilBooks from "@/data/nijil_book.json";

export default defineEventHandler(async (event) => {
  const sources: string[] = ["hdic", "hng", "uthi", "nijil"];
  const query = getQuery(event);
  const character = String(query["character"]);
  const sourceStr =
    query["sources"] === undefined || query["sources"] == ""
      ? "hdic,hng,uthi,nijil"
      : String(query["sources"]); // default to search all
  const isDelegate: boolean = query["isDelegate"] == "true" && true; // default to true, means only search delegate characters
  const sourceList: string[] = sourceStr.split(",");

  console.log(sourceList);
  // character check
  if (character.length != 1) {
    throw createError({
      statusCode: 400,
      statusMessage: "character length is not 1",
    });
  }
  // sources check
  sourceList.forEach((source) => {
    if (!sources.includes(source)) {
      // throw new Error("Invalid source");
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid source",
      });
    }
  });

  let results: Glyph[] = [];

  const hdicPromise = sourceList.includes("hdic")
    ? await fetchHdic(character)
    : Promise.resolve();
  const hngPromise = sourceList.includes("hng")
    ? await fetchHng(character)
    : Promise.resolve();
  const nijilPromise = sourceList.includes("nijil")
    ? await fetchNijil(character, isDelegate)
    : Promise.resolve();
  const uthiPromise = sourceList.includes("uthi")
    ? await fetchUthi(character, isDelegate)
    : Promise.resolve();

  const temp = await Promise.all([
    hdicPromise,
    hngPromise,
    nijilPromise,
    uthiPromise,
  ]).catch((e) => {
    console.log(e);
  });
  
  temp.forEach((item) => {
    if (item) {
      results = results.concat(item);
    }
  });

  return {
    character,
    isDelegate,
    sourceList,
    results,
  };
});

async function fetchHdic(kanji: string) {
  // tsj
  // https://viewer.hdic.jp/api/tsj/search?entry=%E4%BD%9B&def=
  // https://viewer.hdic.jp/api/v1/tsj/search?entry=%E4%BA%AC&def=
  // https://viewer.hdic.jp/api/v1/tsj/imgurl?entry=%E4%BA%AC
  // const tsjEntryUrl =`https://viewer.hdic.jp/api/v1/tsj/search?entry=${kanji}&def=`
  // const { data: tsjEntry, error:tsjEntryError } = await useFetch(tsjEntryUrl, { initialCache: false, server: false })
  let results: Glyph[] = [];
  const tsjImgUrl = await $fetch<string>(
    `https://viewer.hdic.jp/api/v1/tsj/imgurl?entry=${kanji}`
  );
  // TODO: error handling
  const glyph: Glyph = {
    id: "HDIC_TSJ_" + kanji,
    data_source: "hdic",
    date: 898,
    date_jpn: "昌泰元年",
    book_name: "天治本新撰字鏡",
    thumbnail_url: tsjImgUrl,
    manifest_url: "",
    source_virewer_link: "",
    creator: "",
    rights: "",
    rights_url: "",
  };
  results.push(glyph);

  // syp
  // https://viewer.hdic.jp/api/v1/syp/search?entry=%E4%BD%9B&def=
  // https://viewer.hdic.jp/img/syp/a025a074
  const sypEntryUrl = `https://viewer.hdic.jp/api/v1/syp/search?entry=${kanji}&def=`;
  const sypEntry = await $fetch<HdicSyp[]>(sypEntryUrl);
  for (const item of sypEntry) {
    const sypImgUrl = `https://viewer.hdic.jp/img/syp/${item.SYID}`;
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
      rights_url: "",
    };
    results.push(glyph);
  }
  // ktb
  // https://viewer.hdic.jp/api/v1/ktb/search?entry=%E4%BD%9B&def=
  // https://viewer.hdic.jp/img/ktb/1_052_A13.jpg
  const ktbEntryUrl = `https://viewer.hdic.jp/api/v1/ktb/search?entry=${kanji}&def=`;
  const ktbEntry = await $fetch<HdicKtb[]>(ktbEntryUrl);
  for (const item of ktbEntry) {
    const ktbImgUrl = `https://viewer.hdic.jp/img/ktb/${item.TBID}.jpg`;
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
      rights_url: "",
    };
    results.push(glyph);
  }

  return results;
}

async function fetchHng(kanji: string) {
  // https://search.hng-data.org/api/v2/search/character/%E4%BA%AC
  let results: Glyph[] = [];
  const fetchUrl = `https://search.hng-data.org/api/v2/search/character/${kanji}`;
  const data = await $fetch<Hng>(fetchUrl);
  const resultList = data.list;
  resultList.forEach((item) => {
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
      rights_url: item[0].rights_url,
    };
    results.push(glyph);
  });
  return results;
}

async function fetchNijil(kanji: string, delegate = false) {
  let results: Glyph[] = [];
  const fetchUrl = `https://lab.nijl.ac.jp/jikei/api/char/search?delegate=${
    delegate ? "true" : "false"
  }&limit=-1&q=${kanji}`;
  const data = await $fetch<Nijil>(fetchUrl);
  const resultList = data.list;

  resultList.forEach((item) => {
    const foundDate = parseInt(
      NijilBooks.find((book) => book.book_id == item.source.bid).date,
      10
    );
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
      rights_url: item.rights_url,
    };
    results.push(glyph);
  });

  return results;
}

async function fetchUthi(hanzi: string, delegate = false) {
  let results: Glyph[] = [];
  const resultsList = await getUthi(hanzi, delegate);

  resultsList.forEach((item) => {
    let call_number = item.source.call_number.replace("@ja", "");
    let [callNum1, callNum2, callNum3] = call_number.split("-");
    callNum1 = callNum1.replace("貴", "_000ki_");

    // trim
    let date_jpn_formated = item.source.date.replace("@ja", "").trim();
    // zenkaku
    date_jpn_formated = zenkakuConv(date_jpn_formated);
    // remove sign
    date_jpn_formated = date_jpn_formated.replace(/[〔〕（）\(\)]/g, "");

    const glyph: Glyph = {
      id: item.id,
      data_source: "uthi",
      date: null,
      date_jpn: date_jpn_formated,
      book_name: item.source.value.replace("@ja", ""),
      thumbnail_url: item.thumbnail_url,
      manifest_url: item.manifest_url,
      source_virewer_link: `https://clioimg.hi.u-tokyo.ac.jp/viewer/view/idata/000/${callNum1}/${callNum2}/${callNum3}/${item.source.page}?ci=1&kts=2&dts=34&mts=${item.id}`,
      creator: item.creator.replace("@ja", ""),
      rights: item.rights,
      rights_url: item.rights_url,
    };
    results.push(glyph);
  });

  return results;
}

async function getUthi(hanzi: string, delegate = false, position = 1) {
  const fetchUrl = `https://clioapi.hi.u-tokyo.ac.jp/shipsapi/v1/W34/character/${hanzi}?delegate=${
    delegate ? "1" : "0"
  }&position=${position.toString()}`;
  const data = await $fetch<UthiBody>(fetchUrl);
  const resultsCount = (data.search_results || 0) > 99;

  return [
    ...data.list,
    ...(resultsCount ? await getUthi(hanzi, delegate, (position += 100)) : []),
  ];
}

function zenkakuConv(str: string) {
  return str.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  );
}

async function convYearList(
  dates: string[]
): Promise<{ [key: string]: string }> {
  const fetchUrl = "https://ap.hutime.org/cal";
  const body = {
    jsonrpc: "2.0",
    method: "conv",
    params: {
      ical: "1001.1",
      ocal: "101.1",
      otype: "year",
      ival: dates.join("\n"),
    },
  };
  const data = await $fetch<Hutime>(fetchUrl, {
    method: "post",
    body: body,
  });

  let results = {};
  for (const [index, item] of dates.entries()) {
    const ceDate = data.result[index]?.text;
    if (ceDate) {
      // const dateNum = ceDate.replace(/\D/g, "");
      // results[item] = parseInt(dateNum, 10)
      results[item] = ceDate;
    } else results[item] = "Unknown";
  }

  return results;
}
