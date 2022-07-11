import { Schema } from "mongoose";

const HospStatusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "hospStatus",
    timestamps: true,
  }
);

export { HospStatusSchema };
