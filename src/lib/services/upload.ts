import { ID } from "appwrite";
import { storage } from "../appwrite";

export async function uploadProfile(file: any) {
  const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "";

  if (!BUCKET_ID) {
    throw new Error("BUCKET_ID is not defined in environment variables");
  }

  try {
    const uploadResponse = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      file
    );

    const fileId = uploadResponse.$id;
    return fileId;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function deleteProfile(fileId: string) {
  const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "";

  if (!BUCKET_ID) {
    throw new Error("BUCKET_ID is not defined in environment variables");
  }

  try {
    return await storage.deleteFile(BUCKET_ID, fileId);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
