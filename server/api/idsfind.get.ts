import { idsfind } from "idsfind";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const term = query["term"] as string
  const results = idsfind(term)

  // TODO: add error handling

  return {
    search_term: term,
    results
  };
});
