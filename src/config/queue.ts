import { z } from "zod";
export const queConfig = {
  QUEUE_NAME: z.string().nonempty(),
};
