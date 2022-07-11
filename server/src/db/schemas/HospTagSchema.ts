import { Schema } from "mongoose";

const HospTagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    collection: "hospTag",
    timestamps: true,
  }
);

export { HospTagSchema };
