"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  // Ambil amenities & images
  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image) => image && image.name !== "");

  // Upload gambar ke Cloudinary DULU
  const imageUrls = []; // ← Konsisten pakai "imageUrls"

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    const imageBase64 = imageData.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`, {
        folder: 'propertypulse'
      }
    );

    imageUrls.push(result.secure_url); // ← Push URL ke array
  }

  // SETELAH upload selesai, baru buat propertyData
  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: parseInt(formData.get("beds")),
    baths: parseInt(formData.get("baths")),
    square_feet: parseInt(formData.get("square_feet")),
    amenities,
    rates: {
      weekly: formData.get("rates.weekly") || null,
      monthly: formData.get("rates.monthly") || null,
      nightly: formData.get("rates.nightly") || null,
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    images: imageUrls, // ← Pakai "imageUrls" yang sudah terisi
  };

  console.log("Property Data:", propertyData);

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;