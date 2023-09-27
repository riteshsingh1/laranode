import { z } from "zod";
export const databaseConfig = {
  DATABASE_URL: z.string().nonempty(),
  REDIS_QUEUE_PORT: z.string().nonempty(),
  REDIS_QUEUE_URL: z.string().nonempty(),
  REDIS_QUEUE_HOST: z.string().nonempty(),
  REDIS_QUEUE_DB: z.string().nonempty(),
  REDIS_QUEUE_PREFIX: z.string().nonempty(),
};
