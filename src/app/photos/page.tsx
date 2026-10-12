import PhotoGrid from "../components/PhotoGrid";
import PhotoUploader from "../components/PhotoUploader";
import { SignOutButton } from "../components/SignOutButton";

export default function Photos() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-4 py-5 text-gray-900 sm:px-8 sm:py-6">
      <div className="mx-auto max-w-7xl">
  
        <div className="mb-5 flex justify-end">
          <SignOutButton />
        </div>

        <section
          className="relative mb-10 flex min-h-[300px] items-end overflow-hidden rounded-2xl bg-cover bg-center sm:min-h-[380px]"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.05)), url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=85')",
          }}
        >
          <div className="max-w-2xl p-6 sm:p-10 md:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              A community of photography lovers
            </p>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              The Gallery
            </h1>

            <p className="max-w-lg text-sm leading-6 text-white/90 sm:text-lg sm:leading-7">
              A place for every perspective. Discover inspiring photos and
              share moments from your world.
            </p>
          </div>
        </section>

        
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Share a moment
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Have a photo to share? Add it to the community.
            </p>
          </div>

          <PhotoUploader />
        </section>

       
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Explore the collection
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Photos shared by the community.
            </p>
          </div>

          <PhotoGrid />
        </section>
      </div>
    </main>
  );
}