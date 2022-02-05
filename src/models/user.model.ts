import { model, Schema } from 'mongoose';
import { UserType } from '../types';

export const UserSchema = new Schema<UserType>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const User = model<UserType>('User', UserSchema);
