'use client'
import CircleLoader from '@/components/loader/CircleLoader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react'

const LoginForm = () => {
    const [state, setState] = useState({
        loading: false,
        email: "",
        success: false,
        error: "",
      });
    
  return (
    <form
      className="grid w-full grid-cols-1 items-center gap-4 text-gray-800"
      onSubmit={(event) => {
        event.preventDefault();
        // handleLogin();
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
        className="h-9 bg-[#09090a]"
      >
        {state.loading ? <CircleLoader /> : "Send magic link"}
      </Button>

      <p className="text-center text-sm font-medium text-gray-700">
        Don{"'"}t have an account?{" "}
        <Link
          href="/register"
          className="border-b-[1px] border-gray-700 pb-[1px] font-bold hover:border-gray-500 hover:text-gray-600"
        >
          Register
        </Link>{" "}
        for free.
      </p>

      <p
        className={`mb-6 h-[50px] text-center text-sm font-medium ${
          (state.success && !state.error) || (!state.success && state.error)
            ? ""
            : "hidden"
        }`}
      >
        {state.success && !state.error ? (
          <span className="text-green-700">
            We just sent an email with magic link, check your inbox.
          </span>
        ) : null}

        {!state.success && state.error ? (
          <span className="text-red-500">{state.error}</span>
        ) : null}
      </p>
    </form>
  )
}

export default LoginForm