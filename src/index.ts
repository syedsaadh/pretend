import fetch from 'omni-fetch';

function createUrl(url: string, args: any[]): [string, number] {
  let i = 0;
  return [url
    .split('/')
    .map(part => part.startsWith('{') && i <= args.length ? args[i++] : part)
    .join('/'), i];
}

async function execute(method: string, tmpl: string, args: any[]): Promise<any> {
  const url = createUrl(tmpl, args);
  return (await fetch(url[0], { method, body: JSON.stringify(args[url[1]]) })).json();
}

function decoratorFactory(method: string, url: string): MethodDecorator {
  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    descriptor.value = async function(): Promise<any> {
      return execute(method,
        `${this.__Pretend_baseUrl__}${url}`,
          Array.prototype.slice.call(arguments));
    };
    return descriptor;
  };
}

export class Pretend {

  public static builder(): Pretend {
    return new Pretend();
  }

  public target<T>(descriptor: {new(): T}, baseUrl: string): T {
    const instance = new descriptor();
    (instance as any).__Pretend_baseUrl__ =
      baseUrl.endsWith('/') ? baseUrl.substring(0, baseUrl.length - 1) : baseUrl;
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
