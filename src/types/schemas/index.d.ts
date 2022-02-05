import mongoose from 'mongoose';

export interface BaseDocument extends mongoose.Document {
    updatedAt: Date;
    createdAt: Date;
}

export * from './user';
export * from './sauce';
export * from './auth';
