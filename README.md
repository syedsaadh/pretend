# pretend

[![GitHub license](https://img.shields.io/github/license/KnisterPeter/pretend.svg)]()
[![Travis](https://img.shields.io/travis/KnisterPeter/pretend.svg)](https://travis-ci.org/KnisterPeter/pretend)
[![Coveralls branch](https://img.shields.io/coveralls/KnisterPeter/pretend/master.svg)](https://coveralls.io/github/KnisterPeter/pretend)
[![David](https://img.shields.io/david/KnisterPeter/pretend.svg)](https://david-dm.org/KnisterPeter/pretend)
[![David](https://img.shields.io/david/dev/KnisterPeter/pretend.svg)](https://david-dm.org/KnisterPeter/pretend#info=devDependencies&view=table)
[![npm](https://img.shields.io/npm/v/pretend.svg)](https://www.npmjs.com/package/pretend)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A decorator based http webservice client build with typescript (inspired bei feign).

# Features

* Handle JSON based webservices

# Usage

## Installation
Install as npm package:

```sh
npm install pretend --save
```

Install latest development version:

```sh
npm install pretend@next --save
```

## API

```js
class Test {

  @Get('/path/{id}')
  public async get(id: string) {}

  @Post('/path')
  public async post(body: any) {}

  @Put('/path')
  public async put() {}

  @Delete('/path')
  public async delete() {}

}

async function call() {
  const client = Pretend
                  .builder()
                  .target(Test, 'http://host:port/');
  const result = await client.get('some-id');
}

call();

```

## Future ideas / Roadmap

* More content types
* Named parameters

