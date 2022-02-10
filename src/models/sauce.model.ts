import { model, Schema } from 'mongoose';
import { SauceType } from '@types';

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
            default: 0,
            required: true,
        },
        dislikes: {
            type: Number,
            default: 0,
            required: true,
        },
        usersLiked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        usersDisliked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

SauceSchema.pre('validate', function (next) {
    this.likes = this.usersLiked.length;
    this.dislikes = this.usersDisliked.length;
    next();
});

export const Sauce = model<SauceType>('Sauce', SauceSchema);
