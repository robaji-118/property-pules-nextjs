// app/actions/bookmarkProperty.js
'use server'

import connectDB from "@/config/database"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function bookmarkProperty(propertyId) {
  try {
    await connectDB()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      console.error("❌ Tidak ada sessionUser.userId")
      return { error: "User ID is required" }
    }

    const user = await User.findById(sessionUser.userId)
    
    if (!user) {
      return { error: "User not found" }
    }

    console.log("👉 User ditemukan:", user)

    let isBookmarked = user.bookmarks.includes(propertyId)
    let message

    if (isBookmarked) {
      console.log("👉 Hapus bookmark:", propertyId)
      user.bookmarks.pull(propertyId)
      message = 'Bookmark Removed'
      isBookmarked = false
    } else {
      console.log("👉 Tambah bookmark:", propertyId)
      user.bookmarks.push(propertyId)
      message = 'Bookmark Added'
      isBookmarked = true
    }

    await user.save()
    console.log("👉 User setelah save:", user)

    revalidatePath('/properties/saved', 'page')

    return { message, isBookmarked }
  } catch (error) {
    console.error("Bookmark error:", error)
    return { error: "Failed to bookmark property" }
  }
}

export default bookmarkProperty