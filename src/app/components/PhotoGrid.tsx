
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const PhotoGrid = async () => {
  const supabase = await createClient();

  const { data: photos, error } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching photos:", error);

    return (
      <p className="rounded-xl border border-red-200 bg-white p-4 text-sm text-red-600">
        Could not load photos. Please try again.
      </p>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 bg-white p-6 text-center">
        <p className="text-lg font-medium">Your gallery starts here.</p>

        <p className="mt-2 text-sm text-[#77796f]">
          Upload your first photo to share it with the community.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {photos.map((photo) => {
        const { data } = supabase.storage
          .from("photos")
          .getPublicUrl(photo.storage_path);

        return (
          <Link
            key={photo.id}
            href={`/photos/${photo.id}`}
            className="group relative aspect-square overflow-hidden rounded-xl bg-[#e9e9e3]"
          >
            <img
              src={data.publicUrl}
              alt={photo.file_name || "Community photograph"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8">
              <p className="truncate text-xs font-medium text-white sm:text-sm">
                {photo.file_name}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
