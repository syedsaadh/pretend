declare module 'nock' {
  interface Nock {
    log(logger: Console['log']): this;
    get(path: string): this;
    post(path: string, body?: any): this;
    put(path: string): this;
    delete(path: string, body?: any): this;
    patch(path: string, body?: any): this;
    matchHeader(name: string, value: string): this;
    reply(status: number, data?: any): any;
    replyWithError(data: any): any;
  }

  interface NockFunction {
    (baseUrl: string, options ?: {
      reqheaders?: {
        [name: string]: string | RegExp;
      }
    }): Nock;
  }
  const nock: NockFunction;
  export = nock;
}
