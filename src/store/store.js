import { create } from "zustand";

const useKozmoStore = create((set) => ({
  // state management
  messages: [],
  apiHistory: [],
  xp: 0,
  isTyping: false,

  // Analysis state
  analysisFile: null,
  analysisResult: "",
  analysisStatus: "idle", // 'idle' | 'reading' | 'analyzing' | 'done' | 'error'
  analysisError: "",

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
  removeXp: (amount) => set((state) => ({ xp: Math.max(0, state.xp - amount) })),
  // set typing status
  setIsTyping: (status) => set({ isTyping: status }),

  // Setters for analysis
  setAnalysisFile: (file) => set({ analysisFile: file }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
  setAnalysisStatus: (status) => set({ analysisStatus: status }),
  setAnalysisError: (error) => set({ analysisError: error }),
}));

export default useKozmoStore;
