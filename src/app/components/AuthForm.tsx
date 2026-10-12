"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase/browser";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUP] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      return;
    }

    setIsSigningUP(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      return;
    }

    return router.push("/photos");
  };

  const signUpMessage = (
    <p className="rounded-lg bg-green-50 px-4 py-3 text-center text-sm text-green-700">
      Email sent! Check your email to confirm sign up.
    </p>
  );

  return (
    <form
      onSubmit={isNewUser ? handleSignUp : handleLogin}
      className="space-y-6"
    >
      <input
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        placeholder="Password"
      />

      <button
        type="submit"
        className="flex w-full justify-center rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
      >
        {isNewUser ? "Create account" : "Sign in"}
      </button>

      <p className="text-center text-sm text-gray-600">
        {isNewUser ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsNewUser(false)}
              className="font-semibold text-violet-600 transition hover:text-violet-800"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsNewUser(true)}
              className="font-semibold text-violet-600 transition hover:text-violet-800"
            >
              Sign up
            </button>
          </>
        )}
      </p>

      {isSigningUp && signUpMessage}
    </form>
  );
};

export default AuthForm;