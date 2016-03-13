declare module 'omni-fetch' {
  import {RequestOptions} from 'http';
  import {RequestInit, Response} from 'isomorphic-fetch';
  export default function fetch(url: string, options?: RequestOptions | RequestInit): Promise<Response>;
}
