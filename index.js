const { equal, notEqual } = require("node:assert");
const { default: Redis } = require("ioredis");

const redis = new Redis({ port: 26379, host: "localhost" });

async function setUndefinedKey() {
  await redis.set(undefined, "some value");
}

async function getUndefinedKey() {
  const result = await redis.get(undefined);
  equal(result, "some value");
}

async function getBlankStringKey() {
  const result = await redis.get("");
  notEqual(result, "some value");
}

setUndefinedKey()
  .then(() => getUndefinedKey())
  .then(() => getBlankStringKey())
  .then(() => console.log("Finished"))
  .catch(console.error)
  .then(() => redis.disconnect())
