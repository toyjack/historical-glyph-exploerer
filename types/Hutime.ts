export interface Hutime {
  jsonrpc: string;
  result: Result[];
  id: number;
}

export interface Result {
  text: string;
}
