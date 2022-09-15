# ioredis treats `undefiend` key as `''`

## Current Behavior

`ioredis` will treat a key of `undefined` the same as the key `''`, meaning you can call `redis.set(undefined, 'some value')` and later use `redis.get('')` to get `'some value'` from the redis instance. 

## Expected Behavior

`ioredis` either throws an error that `undefined` was passed when there should be an explicit string or Buffer, **or** it is documented that `ioredis` will automatically convert the `undefined` to `''`.

## Reproduction steps

```sh
git clone git@github.com:jmcdo29/ioredis-undefined-key.git
cd ioredis-undefined-key
pnpm i
docker compose up -d
node index.js
docker compose down
```

Observe the assertion failure from `notEqual()` in the `getBlankStringKey` method. 
