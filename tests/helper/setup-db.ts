import { env } from '@/config';
import mongoose from 'mongoose';
import { beforeEach, beforeAll, afterAll } from 'vitest';

beforeAll(async () => {
  const url = new URL(env.mongoose.url);
  const dbName = url.pathname.replace(/^\//, '') || 'default';
  url.pathname = `/${dbName}-test`;

  const safeUrl = url.toString();

  console.log(`Connecting to Test DB: ${url.pathname.replace(/^\//, '')}`);

  await mongoose.connect(safeUrl);
});

beforeEach(async () => {
  await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
});

afterAll(async () => {
  await mongoose.disconnect();
});
