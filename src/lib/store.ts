import { create } from "zustand";

type AuraState = {
  authed: boolean;
  bootComplete: boolean;
  avatarOpen: boolean;
  setAuthed: (v: boolean) => void;
  setBootComplete: (v: boolean) => void;
  toggleAvatar: () => void;
  setAvatarOpen: (v: boolean) => void;
};

export const useAura = create<AuraState>((set) => ({
  authed: false,
  bootComplete: false,
  avatarOpen: false,
  setAuthed: (v) => set({ authed: v }),
  setBootComplete: (v) => set({ bootComplete: v }),
  toggleAvatar: () => set((s) => ({ avatarOpen: !s.avatarOpen })),
  setAvatarOpen: (v) => set({ avatarOpen: v }),
}));
