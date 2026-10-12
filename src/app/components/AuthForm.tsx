"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase/browser";

const AuthForm = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSigningUp(false);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setIsSigningUp(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/photos");
    router.refresh();
  };

  return (
    <form
      onSubmit={isNewUser ? handleSignUp : handleLogin}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[#20211e]"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          required
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="block w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[#20211e] placeholder:text-[#a0a096] outline-none transition focus:border-[#a1b84d] focus:ring-2 focus:ring-[#d7f36a]/50"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-[#20211e]"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          required
          autoComplete={isNewUser ? "new-password" : "current-password"}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="block w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[#20211e] placeholder:text-[#a0a096] outline-none transition focus:border-[#a1b84d] focus:ring-2 focus:ring-[#d7f36a]/50"
        />
      </div>

      <button
        type="submit"
        className="flex w-full justify-center rounded-xl bg-[#20211e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3b3d35] focus:outline-none focus:ring-2 focus:ring-[#a1b84d] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isNewUser ? "Create account" : "Sign in"}
      </button>

      <p className="text-center text-sm text-[#77796f]">
        {isNewUser ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsNewUser(false);
                setErrorMessage("");
                setIsSigningUp(false);
              }}
              className="font-semibold text-[#697d25] transition hover:text-[#46551b] focus-visible:underline"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsNewUser(true);
                setErrorMessage("");
                setIsSigningUp(false);
              }}
              className="font-semibold text-[#697d25] transition hover:text-[#46551b] focus-visible:underline"
            >
              Sign up
            </button>
          </>
        )}
      </p>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}

      {isSigningUp && (
        <p
          role="status"
          className="rounded-lg border border-[#d7f36a] bg-[#f5f9e8] px-4 py-3 text-center text-sm text-[#46551b]"
        >
          Account created! Check your email to confirm your sign-up.
        </p>
      )}
    </form>
  );
};

export default AuthForm;