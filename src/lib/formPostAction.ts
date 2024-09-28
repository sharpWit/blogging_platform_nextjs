"use server";

import { SubscribeSchemaType } from "@/components/footer/subscribeSchema";

export const createSubscriber = (subscriber: SubscribeSchemaType) => {
  console.log("subscriber: ", subscriber);
};
