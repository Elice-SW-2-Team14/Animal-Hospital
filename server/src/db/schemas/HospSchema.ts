import { Schema } from "mongoose";

const HospitalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: true,
    },
    addressCoordinate: {
      type: new Schema(
        {
          X: String,
          Y: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    businessHours: {
      type: [Number],
      required: false,
    },
    businessNumber: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    holiday: {
      type: [String],
      required: false,
    },
    hospitalCapacity: {
      type: Number,
      required: false,
    },
    tag: [
      {
        type: Schema.Types.ObjectId,
        ref: "hospTag",
      },
    ],
    keyword: {
      type: [String],
      required: false,
    },
    service: [
      {
        type: Schema.Types.ObjectId,
        ref: "hospService",
      },
    ],
    image: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    hospStatus: {
      type: Schema.Types.ObjectId,
      ref: "hospStatus",
      required: false,
    },
    hospRegStatus: {
      type: Schema.Types.ObjectId,
      ref: "hospRegStatus",
      required: false,
    },
  },
  {
    collection: "hospitals",
    timestamps: true,
  }
);

export { HospitalSchema };
