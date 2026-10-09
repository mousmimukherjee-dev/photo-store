import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { deletePhoto, addComment } from "../actions";

const Photopage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const supabase = await createClient();

  const { data: photo, error } = await supabase
    .from("photos")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !photo) {
    notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = supabase.storage
    .from("photos")
    .getPublicUrl(photo.storage_path, { download: true });

  const isOwner = user?.id === photo.user_id;

  const { data: comments, error: commentError } = await supabase
    .from("comments")
    .select("*")
    .eq("photo_id", photo.id)
    .order("created_at", { ascending: true });

  if (commentError) {
    console.error("Error happend", commentError);
    return;
  }

  return (
    <main className="mx-auto min-h-screen mt-10 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
        <div className="flex min-h-75 items-center justify-center overflow-hidden rounded-2xl p-3 sm:min-h-112.5">
          <img
            src={data.publicUrl}
            alt={photo.file_name}
            className="block max-h-[75vh] max-w-full rounded-2xl object-contain"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <section className="border-b border-gray-200 pb-6">
            <p className="mb-2 text-sm text-gray-500">Community photo</p>

            <h1 className="wrap-break-word text-2xl font-semibold tracking-tight text-gray-900">
              {photo.file_name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={data.publicUrl}
                className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Download
              </a>

              {isOwner && (
                <form action={deletePhoto.bind(null, photo.id)}>
                  <button
                    type="submit"
                    className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </form>
              )}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Comments</h2>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                {comments.length}
              </span>
            </div>

            {user ? (
              <form action={addComment} className="flex flex-col gap-3">
                <input type="hidden" name="photoId" value={photo.id} />

                <textarea
                  name="comment"
                  placeholder="Write a comment..."
                  required
                  rows={3}
                  className="w-full resize-y rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />

                <button
                  type="submit"
                  className="self-start rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Post Comment
                </button>
              </form>
            ) : (
              <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                Log in to leave a comment.
              </p>
            )}

            <div className="flex flex-col gap-3">
              {comments.length === 0 ? (
                <p className="rounded-xl border border-dashed border-gray-200 p-5 text-center text-sm text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <article
                    key={comment.id}
                    className="rounded-xl bg-gray-50 p-4"
                  >
                    <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-800">
                      {comment.comment}
                    </p>

                    <time
                      dateTime={comment.created_at}
                      className="mt-3 block text-xs text-gray-400"
                    >
                      {new Date(comment.created_at).toLocaleString()}
                    </time>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Photopage;
