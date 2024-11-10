import { defineMongooseModel } from "#nuxt/mongoose";
import { type ObjectId, Schema } from "mongoose";

export interface Ride {
  originStation: string;
  destinationStation: string;
  start: Date;
  end: Date;
  party: ObjectId[];
}

export const Ride = defineMongooseModel<Ride>({
  name: "Ride",
  schema: {
    originStation: {
      type: String,
      required: true,
    },
    destinationStation: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    party: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
});
