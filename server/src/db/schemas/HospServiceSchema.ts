import { Schema } from "mongoose";

const HospServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "hospitals",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ServiceCapacity: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    collection: "hospService",
    timestamps: true,
  }
);

export { HospServiceSchema };
