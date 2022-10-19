import { idsfind } from "idsfind";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const term = query["term"] as string
  const results = idsfind(term)

  return {
    search_term: term,
    results
  };
});
