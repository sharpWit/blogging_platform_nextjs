import { z } from "zod";

export const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

export type SubscribeSchemaType = z.infer<typeof subscribeSchema>;
