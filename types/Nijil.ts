export interface Nijil {
  search_results: number;
  list: List[];
}

export interface List {
  id: string;
  character: string;
  delegate: boolean;
  unicode: string;
  source: Source;
  thumbnail_url: string;
  manifest_url: string;
  link: string;
  subject: string;
  creator: string;
  rights: string;
  rights_url: string;
}

export interface Source {
  label: string;
  title: string;
  bid: string;
  frame: number;
  side: string;
}

export interface NijilError {
  error: Error[];
}

export interface Error {
  key: string;
  message: string;
}
