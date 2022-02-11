import { Types } from 'mongoose';
import { Sauce } from '@models';
import { SauceInput, SauceType } from '@types';

export const getSauceById = async (id: string) => {
    return Sauce.findOne({ _id: id });
};

export const getAllSauces = async () => {
    return Sauce.find();
};

export const dislikeSauceById = async (id: string, userId: string) => {
    return Sauce.updateOne(
        {
            _id: id,
        },
        {
            $push: {
                usersDisliked: [userId],
            },
            $pullAll: {
                usersLiked: [userId],
            },
        }
    );
};

export const likeSauceById = async (id: string, userId: string) => {
    return Sauce.updateOne(
        {
            _id: id,
        },
        {
            $push: {
                usersLiked: [userId],
            },
            $pullAll: {
                usersDisliked: [userId],
            },
        }
    );
};

export const removeLikeSauceById = async (id: string, userId: string) => {
    return Sauce.updateOne(
        {
            _id: id,
        },
        {
            $pullAll: {
                usersLiked: [userId],
                usersDisliked: [userId],
            },
        }
    );
};

export const deleteSauce = async (sauceId) => {
    return Sauce.deleteOne({ _id: sauceId });
};

export const createSauce = async (
    input: SauceInput,
    image: string,
    userId: string
) => {
    const sauce = new Sauce({
        userId: userId,
        name: input.name,
        manufacturer: input.manufacturer,
        description: input.description,
        mainPepper: input.mainPepper,
        imageUrl: image,
        heat: input.heat,
    });

    return await sauce.save();
};

export const editSauce = async (
    sauceId: string,
    input: SauceInput,
    userId: string,
    image?: string
) => {
    const newValue: Partial<SauceType> = {
        userId: new Types.ObjectId(userId),
        name: input.name,
        manufacturer: input.manufacturer,
        description: input.description,
        mainPepper: input.mainPepper,
        heat: input.heat,
    };

    if (image) {
        newValue.imageUrl = image;
    }

    return Sauce.updateOne({ _id: sauceId }, newValue);
};
