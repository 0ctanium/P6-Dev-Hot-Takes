import { BaseDocument, UserType } from './index';
import { PopulatedDoc } from 'mongoose';

export interface SauceType extends BaseDocument {
    user: PopulatedDoc<UserType>;
    // Sauce name
    name: string;
    // Sauce manufacturer
    manufacturer: string;
    // Sauce description
    description: string;
    // The main spicy ingredient of the sauce
    mainPepper: string;
    // URL of the image of the sauce downloaded by the user
    imageUrl: string;
    // Number between 1 and 10 describing the water
    heat: number;
    // Number of users who liked the sauce
    likes: number;
    // Number of users who disliked the sauce
    dislikes: number;
    // Table of user IDs who liked the sauce
    usersLiked: PopulatedDoc<UserType>[];
    // Table of user IDs who disliked the sauce
    usersDislike: PopulatedDoc<UserType>[];
}