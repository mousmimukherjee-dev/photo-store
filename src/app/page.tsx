import AuthForm from "./components/AuthForm";

export default function Home() {
return (
<main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4 py-10">
<div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
<div className="mb-8 text-center">
<div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d7f36a] text-[#20211e]">
<span className="text-3xl">📸</span>
</div>

      <h1 className="mb-3 text-3xl font-semibold tracking-tight text-[#20211e]">
        Welcome to snapspace<span className="text-[#a1b84d]">.</span>
      </h1>

      <p className="text-sm leading-6 text-[#77796f] sm:text-base">
        Sign in to share, upload, and discover photos from the community.
      </p>
    </div>

    <AuthForm />

    <p className="mt-6 text-center text-xs text-[#85877c]">
      A space for moments worth sharing.
    </p>
  </div>
</main>

);
}