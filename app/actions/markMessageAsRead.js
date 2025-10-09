"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: "User ID is required" };
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error('Message not found')

  if (message.recipient.toString() !== userId){
    throw new Error ('Unauthrozied')
  }

  message.read = !message.read

  reValidatePath('/message', 'page')

  await message.save()

  return message.read
}

export default markMessageAsRead;
