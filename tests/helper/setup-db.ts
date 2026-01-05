import { env } from '@/config';
import mongoose from 'mongoose';
import { beforeEach, beforeAll, afterAll } from 'vitest';

beforeAll(async () => {
  console.log('Setting up DB..');
  await mongoose.connect(env.mongoose.url);
});

beforeEach(async () => {
  await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
});

afterAll(async () => {
  await mongoose.disconnect();
});
