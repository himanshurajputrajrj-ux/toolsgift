"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { PublicUser } from "@/app/lib/auth/types";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  user: PublicUser | null;
  status: AuthStatus;
  refresh: () => Promise<void>;
  signOut: (options?: { all?: boolean }) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Client-side view of the session. The source of truth is always the
 * httpOnly session cookie verified by the server (`/api/auth/me`); nothing
 * about the session is persisted in browser storage.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        cache: "no-store",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("me failed");
      }

      const data = (await response.json()) as {
        ok: boolean;
        user: PublicUser | null;
      };

      const nextUser = data.ok ? data.user : null;
      setUser(nextUser);
      setStatus(nextUser ? "authenticated" : "unauthenticated");
    } catch {
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    // The fetch resolves asynchronously, so no state is set synchronously
    // during the effect body itself.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  const signOut = useCallback(async (options?: { all?: boolean }) => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ all: options?.all === true }),
      });
    } finally {
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  const value: AuthContextValue = {
    user,
    status,
    refresh,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
