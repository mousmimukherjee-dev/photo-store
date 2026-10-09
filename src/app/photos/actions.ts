"use server";
import { createClient } from "@/lib/supabase/server";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePhoto(photoId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data: photo, error: photoError } = await supabase
    .from("photos")
    .select("id,user_id,storage_path")
    .eq("id", photoId)
    .eq("user_id", user.id)
    .single();

  if (photoError || !photo) {
    console.error("Photo not found or user is not the owner", photoError);
    return;
  }

  const { error: storageError } = await supabase.storage
    .from("photos")
    .remove([photo?.storage_path]);

  if (storageError) {
    console.error("storage delete error", storageError);

    return;
  }

  const { error: databaseError } = await supabase
    .from("photos")
    .delete()
    .eq("id", photo?.id);

  if (databaseError) {
    console.error("Database delete error", databaseError);
    return;
  }

  revalidatePath("/photos");
  redirect("/photos");
}

export async function addComment(formData: FormData) {
  const photoId = formData.get("photoId");
  const comment = formData.get("comment");

  if (typeof photoId !== "string" || typeof comment !== "string") {
    console.log("Invalid form values");
    return;
  }

  const commentText = comment.trim();

  if (!commentText) {
    console.log("Comment is empty");
    return;
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("STOP: No logged-in user");
    return;
  }

  const { data: photo, error: photoError } = await supabase
    .from("photos")
    .select("id")
    .eq("id", photoId)
    .maybeSingle();

  if (photoError || !photo) {
    console.log("Photo not found");
    return;
  }

  const { data: savedComment, error: insertError } = await supabase
    .from("comments")
    .insert({
      photo_id: photoId,
      user_id: user.id,
      comment: commentText,
    })
    .select()
    .single();

  if (insertError) {
    console.error("COMMENT INSERT FAILED:", insertError);
    return;
  }

  revalidatePath(`/photos/${photoId}`);
}
