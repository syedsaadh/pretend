declare module 'nock' {
  interface Nock {
    get(path: string): Nock;
    post(path: string, body?: any): Nock;
    put(path: string): Nock;
    delete(path: string): Nock;
    reply(status: number, data?: any): any;
    replyWithError(data: any): any;
  }

  interface NockFunction {
    (baseUrl: string): Nock;
  }
  const nock: NockFunction;
  export = nock;
}
