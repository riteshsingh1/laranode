import env from "@/config";
import { Queue } from "bullmq";

const queues = env.QUEUES_LIST;

const queuesObject: Record<string, object> = {};
queues.split("|").forEach((q) => {
  queuesObject[q] = new Queue(q, {
    connection: {
      host: env.REDIS_QUEUE_HOST,
      port: Number(env.REDIS_QUEUE_PORT),
    },
  });
});

export default { ...queuesObject };
