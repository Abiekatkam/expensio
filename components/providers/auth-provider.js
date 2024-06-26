"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SWRConfig } from "swr";
import fetcher from "@/lib/fetcher";
import Cookies from "js-cookie";
import { cookieTokenName } from "@/components/constant/urls";

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [initial, setInitial] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();
  const { user, children, ...others } = props;
  const isValidToken = Cookies.get(cookieTokenName);
  useEffect(() => {
    async function getActiveSession() {
      if (isValidToken) {
        // router.push("/v1");
        setSession(user);
        setInitial(true);
      } else {
        window.location.href = "/login";
      }
      setInitial(false);
    }

    getActiveSession();
  }, [isValidToken]);

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
    };
  }, [initial, session, user]);

  return (
    <AuthContext.Provider value={value} {...others}>
      <SWRConfig value={{ fetcher }}>{session ? children : null}</SWRConfig>
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a AuthContext.`);
  }
  return context?.user ?? null;
};
