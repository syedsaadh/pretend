import fetch from 'omni-fetch';
import { Response } from 'isomorphic-fetch';

interface IPretendConfiguration {
  baseUrl: string;
  decoder: IPretendDecoder;
}

function createUrl(url: string, args: any[]): [string, number] {
  let i = 0;
  return [url
    .split('/')
    .map(part => part.startsWith('{') && i <= args.length ? args[i++] : part)
    .join('/'), i];
}

async function execute(config: IPretendConfiguration, method: string, tmpl: string, args: any[]): Promise<any> {
  const url = createUrl(tmpl, args);
  const response = await fetch(url[0], { method, body: JSON.stringify(args[url[1]]) });
  return config.decoder(response);
}

function decoratorFactory(method: string, url: string): MethodDecorator {
  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    descriptor.value = async function(): Promise<any> {
      const config = this.__Pretend__ as IPretendConfiguration;
      return execute(config, method, `${config.baseUrl}${url}`, Array.prototype.slice.call(arguments));
    };
    return descriptor;
  };
}

export type IPretendDecoder = (response: Response) => Promise<any>;

export class Pretend {

  private decoder: IPretendDecoder = Pretend.JsonDecoder;

  public static JsonDecoder: IPretendDecoder = (response: Response) => response.json();
  public static TextDecoder: IPretendDecoder = (response: Response) => response.text();

  public static builder(): Pretend {
    return new Pretend();
  }

  public decode(decoder: IPretendDecoder): this {
    this.decoder = decoder;
    return this;
  }

  public target<T>(descriptor: {new(): T}, baseUrl: string): T {
    const instance = new descriptor();
    (instance as any).__Pretend__ = {
      baseUrl: baseUrl.endsWith('/')
        ? baseUrl.substring(0, baseUrl.length - 1)
        : baseUrl,
      decoder: this.decoder
    } as IPretendConfiguration;
    return instance;
  }

}

export function Get(url: string): MethodDecorator {
  return decoratorFactory('GET', url);
}

export function Post(url: string): MethodDecorator {
  return decoratorFactory('POST', url);
}

export function Put(url: string): MethodDecorator {
  return decoratorFactory('PUT', url);
}

export function Delete(url: string): MethodDecorator {
  return decoratorFactory('DELETE', url);
}
