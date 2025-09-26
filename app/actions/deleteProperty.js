'use server';

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";


async function deleteProperty (propertyId){
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User Id is required')
    }

    const {userId} = sessionUser;

    const property = await Property.findById(propertyId)

    if (!property) throw new Error('Property Not Found')

    //verify

    if(property.owner.toString() !== userId) {
        throw new Error('Unauthorized')
    }

    await property.deleteOne()
    
}

export default deleteProperty;