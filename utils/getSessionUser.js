import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async (req, res) => {
  
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
      username: session.user.username,
      image: session.user.image,
    };
};
