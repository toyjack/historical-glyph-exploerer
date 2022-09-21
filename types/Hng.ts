export interface Hng {
  status_code: number;
  search_results: number;
  list: HngList[];
}

export interface HngList {
  id: string;
  character: string;
  unicode: string;
  source: HngSource;
  thumbnail_url: string;
  manifest_url: string;
  link: string;
  creator: string;
  rights: string;
  rights_url: string;
}

export interface HngSource {
  name: string;
  type: string;
  content: string;
  short_name: string;
  date: string;
}
