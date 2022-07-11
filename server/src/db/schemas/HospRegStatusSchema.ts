import { Schema } from "mongoose";

const HospRegStatusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "hospRegStatus",
    timestamps: true,
  }
);

export { HospRegStatusSchema };
