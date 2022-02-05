import mongoose, { ObjectId } from 'mongoose';

export interface BaseDocument extends mongoose.Document<ObjectId> {
    updatedAt: Date;
    createdAt: Date;
}

export * from './user';
export * from './sauce';
export * from './auth';
