"use client";
import { applicationServerUrls } from "@/components/constant/urls";
import CircleLoader from "@/components/loader/CircleLoader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

const RegisterForm = () => {
  const [state, setState] = useState({
    loading: false,
    email: "",
    success: false,
    error: "",
  });

  const handleRegister = async () => {
    setState((prev) => ({ ...prev, loading: true, error: "", success: false }));

    try {
      const res = await fetch(applicationServerUrls.auth.register, {
        method: "POST",
        body: JSON.stringify({ email: state.email }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      setState((prev) => ({
        ...prev,
        success: true,
        loading: false,
        email: "",
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, error: error.message, loading: false }));
    }
  };

  return (
    <form
      className="grid relative w-full grid-cols-1 items-center gap-3 text-gray-800"
      onSubmit={(event) => {
        event.preventDefault();
        handleRegister();
      }}
    >
      <label className="mb-1 block">
        <span className="mb-2 block text-sm font-semibold leading-6">
          Email Address
        </span>
        <input
          className="mt-2 block h-9 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:italic"
          autoFocus
          inputMode="email"
          autoComplete="email"
          type="email"
          placeholder="eg: abie@gmail.com"
          required
          value={state.email}
          onChange={(event) => {
            setState({ ...state, email: event.target.value });
          }}
        />
      </label>
      <Button
        type="submit"
        disabled={state.loading}
        className="h-9 bg-[#09090a] text-white"
      >
        {state.loading ? <CircleLoader /> : "Register"}
      </Button>

      <p className="text-center text-sm font-medium text-zinc-700">
        Already registered?{" "}
        <Link
          href="/login"
          className="border-b-[1px] border-zinc-700 pb-[1px] font-bold hover:border-zinc-500 hover:text-zinc-600"
        >
          Login
        </Link>{" "}
        to your account.
      </p>

      <p
        className={`h-[50px] text-center text-xs font-medium mt-2 ${
          (state.success && !state.error) || (!state.success && state.error)
            ? ""
            : "hidden"
        }`}
      >
        {state.success && !state.error ? (
          <span className="text-green-700 bg-green-100 p-2 rounded-md">
            We just sent an email with magic link{","} check your inbox.
          </span>
        ) : null}

        {!state.success && state.error ? (
          <span className="text-red-500 bg-red-100 p-2 rounded-md">
            {state.error}
          </span>
        ) : null}
      </p>
    </form>
  );
};

export default RegisterForm;
