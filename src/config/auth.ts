import { z } from "zod";
export const authConfig = {
  DATABASE_URL: z.string().nonempty(),
};
