"use client";
import { CircleAlert } from "lucide-react";
import Button from "../_ui/Button";
import Logo from "../_ui/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signUpUser, loginUser, signWithGoogle } from "../_libs/services";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setAuthError(null);
    setSuccessMessage(null);

    try {
      if (mode === "signup") {
        const result = await signUpUser({
          email: data.email,
          password: data.password,
        });
        console.log("Signup successful:", result);

        // Check if email confirmation is required
        if (result.user && !result.session) {
          // Email confirmation required
          setSuccessMessage(
            "Account created! Please check your email to confirm your account before logging in."
          );
          // Optionally redirect to login after a delay
          setTimeout(() => router.push("/login"), 3000);
        } else {
          // Auto sign-in successful (no email confirmation required)
          router.push("/dashboard");
        }
      } else {
        const result = await loginUser({
          email: data.email,
          password: data.password,
        });
        console.log("Login successful:", result);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setAuthError(
        error instanceof Error
          ? error.message
          : "Authentication failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);

    try {
      await signWithGoogle();
      // Note: Google OAuth will redirect automatically
    } catch (error) {
      console.error("Google sign-in error:", error);
      setAuthError(
        error instanceof Error
          ? error.message
          : "Google sign-in failed. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-center items-center bg-white px-4 py-8 lg:p-12 rounded-xl border border-neutral-200 w-full max-w-[540px]">
      <Logo />

      <div className="my-4">
        <h2 className="text-2xl leading-[120%] -tracking-[0.5px] text-neutral-950 font-bold">
          {mode === "login" && "Welcome to Note"}
          {mode === "signup" && "Create Your Account"}
        </h2>
        <p className="text-sm leading-[140%] text-neutral-600">
          {mode === "signup" &&
            "Sign up to start organizing your notes and boost your productivity."}
          {mode === "login" && " Please log in to continue"}
        </p>
      </div>

      {successMessage && (
        <div className="w-full mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600 text-left flex items-start gap-2">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{successMessage}</span>
          </p>
        </div>
      )}

      {authError && (
        <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 text-left flex items-start gap-2">
            <CircleAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{authError}</span>
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-sm text-left leading-[120%] -tracking-[0.2px] text-neutral-950 font-medium"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className={`placeholder:text-neutral-600 text-neutral-950 px-3 text-left h-[42px] border outline-none rounded-lg w-full ${
              errors.email ? "border-red-500" : "border-neutral-300"
            }`}
            id="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500 text-left">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm leading-[120%] text-left -tracking-[0.2px] text-neutral-950 font-medium"
            >
              Password
            </label>
            {mode === "login" && (
              <p className="text-sm leading-[120%] text-neutral-600 underline cursor-pointer">
                Forgot
              </p>
            )}
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className={`placeholder:text-neutral-600 text-neutral-950 px-3 text-left h-[42px] border outline-none rounded-lg w-full ${
              errors.password ? "border-red-500" : "border-neutral-300"
            }`}
            id="password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 text-left">
              {errors.password.message}
            </p>
          )}
          {mode === "signup" && !errors.password && (
            <p className="inline-flex items-center gap-1 text-left text-sm text-neutral-600 leading-[120%]">
              <CircleAlert className="w-4.5 h-4.5" /> At least 8 characters
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          additionalStyles="rounded-lg py-3 w-full"
          disabled={isLoading}
        >
          {isLoading
            ? mode === "signup"
              ? "Creating account..."
              : "Logging in..."
            : mode === "signup"
            ? "Sign Up"
            : "Login"}
        </Button>
      </form>

      <div className="w-full h-px bg-neutral-200 mt-4" />

      <div className="grid divide-y divide-neutral-200 gap-4 mt-6 w-full">
        <div className="flex flex-col gap-4 pb-4">
          <p className="text-sm leading-[130%] -tracking-[0.2px] text-neutral-600">
            Or {mode === "signup" ? "sign up" : "log in"} with:
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            additionalStyles="flex justify-center items-center w-full rounded-lg h-[42px]"
            disabled={isLoading}
          >
            <span className="text-neutral-black text-2xl font-bold">G</span>
            Google
          </Button>
        </div>

        {mode === "login" && (
          <p className="text-sm leading-[130%] -tracking-[0.2px] text-neutral-600 pt-4">
            No account yet?{" "}
            <Link
              href="/signup"
              className="text-neutral-950 font-medium underline"
            >
              Sign Up
            </Link>
          </p>
        )}

        {mode === "signup" && (
          <p className="text-sm leading-[130%] -tracking-[0.2px] text-neutral-600 pt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-neutral-950 font-medium underline"
            >
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
