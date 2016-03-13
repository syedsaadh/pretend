declare interface IFetchOptions {
}
declare interface IFetchResponse {
  url: string;
  status: number;
  statusText: string;
  headers: any;
  ok: boolean;
  body: any;
  bodyUsed: boolean;
  size: number;
  timeout: number;

  json<T>(): T;
}
declare function fetch(url: string, options?: IFetchOptions): Promise<IFetchResponse>;
