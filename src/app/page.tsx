import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <span className="text-3xl">📸</span>
          </div>

          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
            Welcome to SnapSpace
          </h1>

          <p className="text-sm leading-6 text-gray-600 sm:text-base">
            Sign in to share, upload, and save your favorite photos.
          </p>
        </div>

        <AuthForm />

        <p className="mt-6 text-center text-xs text-gray-500">
          A space for the photos you love.
        </p>
      </div>
    </main>
  );
}