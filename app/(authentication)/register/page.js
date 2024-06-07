import Link from "next/link";
import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <main className="m-auto flex h-[100vh] w-full flex-col items-center justify-center pl-2 pr-2 bg-white sm:max-w-[380px]  selection:bg-slate-700/60 selection:text-white  relative">
      <Link
        href="/"
        className="w-fit flex flex-col items-center justify-center text-5xl group"
      >
        <span className="rounded-full bg-[#09090a] text-white group-hover:rotate-12 p-3 transition-all ease-in duration-200">
          <FaIndianRupeeSign />
        </span>
        <span className="mt-2 font-black text-4xl text-[#09090a]">
          Expensio
        </span>
      </Link>
      <p className="mb-6 mt-3 text-center text-sm font-medium text-zinc-600 ">
        Join Expensio to streamline your expense tracking and elevate financial
        management
      </p>
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
