import { Schema, Types } from 'mongoose';

const ReviewSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        targetHospital: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        like: {
            type: Number,
            required: true,
        },
    },
    {
        collection: 'reviews',
        timestamps: true,
    }

);

ReviewSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

ReviewSchema.set('toJSON', {
    virtuals: true
})

export {ReviewSchema}