import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }), //Return the new state object, it will only update the properties[selectedConversation] but not actions[setSelectedConversation] 
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation; 