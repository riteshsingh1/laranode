import env from "@/config";
import { Queue } from "bullmq";

const Dispatch = new Queue(env.QUEUE_NAME, {
  connection: {
    host: env.REDIS_QUEUE_HOST,
    port: Number(env.REDIS_QUEUE_PORT),
  },
});

export default Dispatch;
