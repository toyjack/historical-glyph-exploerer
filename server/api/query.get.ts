export default defineEventHandler((event) => {
  const query = getQuery(event);
  const kanji = encodeURI(query["kanji"]);

  return `https://viewer.hdic.jp/api/v1/tsj/imgurl?entry=${kanji}`;
});
