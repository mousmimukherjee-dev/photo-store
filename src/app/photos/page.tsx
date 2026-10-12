import PhotoGrid from "../components/PhotoGrid";
import PhotoUploader from "../components/PhotoUploader";
import { SignOutButton } from "../components/SignOutButton";

export default function Photos() {
  return (
    <main id="top" className="min-h-screen bg-[#f7f7f5] text-[#20211e]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10">
        <header className="flex h-[68px] items-center justify-between border-b border-black/10">
          <a href="/photos" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d7f36a] text-lg font-bold text-black">
              s
            </span>

            <span className="text-xl font-semibold tracking-tight">
              snapspace<span className="text-[#a1b84d]">.</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#77796f] sm:block">
              Your space to share
            </span>

            <SignOutButton />
          </div>
        </header>

        <section className="relative mt-5 flex min-h-[250px] items-end overflow-hidden rounded-2xl sm:min-h-[270px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />

          <div className="relative z-10 max-w-2xl px-6 py-7 sm:px-9 sm:py-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d7f36a] sm:text-xs">
              A community for every perspective
            </p>

            <h1 className="text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl">
              The world, through your lens.
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/85 sm:text-base">
              Discover new perspectives and share the moments that stay with
              you.
            </p>

            <a
              href="#gallery"
              className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#d7f36a] px-4 py-2.5 text-sm font-semibold text-[#20211e] transition-colors hover:bg-white"
            >
              Explore the gallery
              <span aria-hidden="true">↘</span>
            </a>
          </div>
        </section>

        <section className="my-6 rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-medium tracking-tight">
                Share a moment<span className="text-[#a1b84d]">.</span>
              </h2>

              <p className="mt-1 text-sm text-[#77796f]">
                Add a photo to the SnapSpace community.
              </p>
            </div>

            <span className="hidden text-xs text-[#85877c] sm:block">
              Your view matters.
            </span>
          </div>

          <PhotoUploader />
        </section>

        <section id="gallery" className="pb-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#85877c]">
                A window into other worlds
              </p>

              <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                Fresh perspectives
                <span className="text-[#a1b84d]">.</span>
              </h2>
            </div>

            <a
              href="#top"
              className="shrink-0 text-xs font-medium text-[#55574f] underline decoration-black/20 underline-offset-4 hover:text-black"
            >
              Back to top ↑
            </a>
          </div>

          <PhotoGrid />
        </section>

        <footer className="flex items-center justify-between border-t border-black/10 py-4 text-xs text-[#85877c]">
          <p className="font-medium text-[#33352f]">
            snapspace<span className="text-[#a1b84d]">.</span>
          </p>

          <p>Made for moments worth sharing.</p>
        </footer>
      </div>
    </main>
  );
}
