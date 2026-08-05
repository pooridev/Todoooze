"use client";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "todoooze.profile.v1";

export interface Profile {
  name: string;
}

const DEFAULT_PROFILE: Profile = {
  name: "Pooria",
};

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  // Hydrate after mount so server-rendered markup matches the first client render.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY) ?? "{}";
      if (raw) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(raw) });
    } catch {
      setProfile(DEFAULT_PROFILE);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      profile,
      updateProfile: (updates: Partial<Profile>) => {
        setProfile((prev) => {
          const next = { ...prev, ...updates };

          try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {
            // Storage may be unavailable; the profile still works in-memory.
          }

          return next;
        });
      },
    }),
    [profile]
  );

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("You must wrap your consumers around <ProfileContext.Provider />");
  }

  return context;
};
