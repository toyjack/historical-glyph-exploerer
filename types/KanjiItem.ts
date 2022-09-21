export interface KanjiItem {
  status_code: string;
  search_results: string;
  data: KanjiData[];
}

export interface KanjiData {
  identifer: string;
  id: string;
  title: string;
  delegate: string;
  radical_code: string;
  unicode: string;
  daikanwa_code: string;
  chinese_reading: string;
  japanese_reading: string;
  source: Source;
  coverage: Coverage;
  thumbnail_url: string;
  manifest_url: string;
  subject: string;
  creator: string;
  rights: string;
  rights_url: string;
}

export interface Coverage {
  date: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lon: string;
}

export interface Source {
  division: string;
  call_number: string;
  page: string;
  date: string;
  document: string;
  value: string;
  send: string;
  to: string;
  remarks: string;
  occupation: string;
}
