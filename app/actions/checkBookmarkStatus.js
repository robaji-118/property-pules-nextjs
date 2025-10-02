"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId) {   // ✅ ganti property -> propertyId
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    console.error("❌ Tidak ada sessionUser.userId");
    return { error: "User ID is required" };
  }

  const user = await User.findById(sessionUser.userId);

  if (!user) {
    console.error("❌ User tidak ditemukan di DB");
    return { error: "User not found" };
  }

  console.log("👉 User ditemukan:", user._id);
  console.log("👉 propertyId yang dicek:", propertyId);

  let isBookmarked = user.bookmarks.includes(propertyId);

  console.log("📌 Status bookmark:", isBookmarked);

  return { isBookmarked };   // ✅ jangan return kosong
}

export default checkBookmarkStatus;
