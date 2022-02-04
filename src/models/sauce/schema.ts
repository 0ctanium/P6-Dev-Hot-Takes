import { model, Schema } from 'mongoose';
import { SauceType } from '../../types';

export const SauceSchema = new Schema<SauceType>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        name: {
            type: String,
            required: true,
        },
        manufacturer: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        mainPepper: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        heat: {
            type: Number,
            required: true,
        },
        likes: {
            type: Number,
            required: true,
        },
        dislikes: {
            type: Number,
            required: true,
        },
        usersLiked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        usersDislike: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

export const Sauce = model<SauceType>('Sauce', SauceSchema);
