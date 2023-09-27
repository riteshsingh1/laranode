import { z } from "zod";
export const queConfig = {
  QUEUES_LIST: z.string().nonempty(),
};
