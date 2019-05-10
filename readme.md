todaq API heleper

Install

`yarn add todaq-api-helper --save`

Run the project

1. yarn install
2. yarn build
3. yarn dev

Usage

```
import todaq from "todaq-api-helper";

todaq.routes.accounts.get.accounts()
    .then(res => console.log('response', res));

OR

const settings = {};
const route = '/';

todaq.API.get(route', settings)
    .then(res => console.log('response', res));
```