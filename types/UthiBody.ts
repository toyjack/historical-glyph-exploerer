export interface UthiBody {
  status_code: string;
  status?:number,
  search_results: number;
  list: List[];
}

export interface List {
  identifer: string;
  id: string;
  title: string;
  delegate: string;
  unicode: string;
  source: Source;
  thumbnail_url: string;
  manifest_url: string;
  subject: string;
  creator: string;
  rights: string;
  rights_url: string;
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
