import { z } from "zod";
export const logConfig = {
  LOG_LEVEL: z.string().nonempty(),
};
