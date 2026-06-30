"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { ENDPOINTS } from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // fungsi otomatis untuk memeriksa cookie session ke backend
  const checkUserSession = async () => {
    try {
      const response = await axios.get(ENDPOINTS.me, {
        withCredentials: true,
      });
      setUser(response.data.user);
      try {
        localStorage.setItem("isAuthenticated", "true");
      } catch (e) { }
      try {
        if (response.data?.user)
          localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (e) { }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        try {
          await axios.post(ENDPOINTS.refresh, {}, { withCredentials: true });
          const retry = await axios.get(ENDPOINTS.me, { withCredentials: true });
          setUser(retry.data.user);
          try {
            localStorage.setItem("isAuthenticated", "true");
          } catch (e) { }
          try {
            if (retry.data?.user)
              localStorage.setItem("user", JSON.stringify(retry.data.user));
          } catch (e) { }
        } catch (refreshErr) {
          setUser(null);
          try {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
          } catch (e) { }
        }
      } else {
        setUser(null);
        try {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("user");
        } catch (e) { }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const cachedUser = localStorage.getItem("user");
        const cached = localStorage.getItem("isAuthenticated");
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        } else if (cached === "true") {
          // Optimistic placeholder while validation completes
          setUser({});
        }
      } catch (e) { }

      await checkUserSession();
    };

    init();
  }, []);

  // Redirect authenticated user away from public pages
  useEffect(() => {
    if (!loading && user) {
      if (
        pathname === "/" ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/register")
      ) {
        router.replace("/dashboard");
      }
    }
  }, [user, loading, pathname, router]);

  // Redirect unauthenticated user away from protected pages
  useEffect(() => {
    if (!loading && !user) {
      if (pathname.startsWith("/dashboard")) {
        router.replace("/login");
      }
    }
  }, [user, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkUserSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
