import { create } from "zustand";

const useKozmoStore = create((set) => ({
  // state management
  messages: [],
  apiHistory: [],
  xp: 0,
  isTyping: false,
  // actions
  // send message
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  // add to history
  addToHistory: (entry) =>
    set((state) => ({ apiHistory: [...state.apiHistory, entry] })),
  // clear chat
  clearChat: () => set({ messages: [], apiHistory: [] }),
  // add xp
  addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
  removeXp: (amount) => set((state) => ({ xp: state.xp - amount })),
  // set typing status
  setIsTyping: (status) => set({ isTyping: status }),
}));

export default useKozmoStore;
