import { Sauce } from '@models';
import { SauceInput } from '@types';

export const getSauceById = async (id: string) => {
    return Sauce.findOne({ _id: id });
};

export const getAllSauces = async () => {
    return Sauce.find();
};

export const createSauce = async (
    input: SauceInput,
    image: string,
    userId: string
) => {
    const sauce = new Sauce({
        user: userId,
        name: input.name,
        manufacturer: input.manufacturer,
        description: input.description,
        mainPepper: input.mainPepper,
        imageUrl: image,
        heat: input.heat,
    });

    return await sauce.save();
};
