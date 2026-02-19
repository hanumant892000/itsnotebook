import { createContext, useContext, useState } from "react";
import { BaseUrls } from "./../BaseUrls";
import { useAuthState } from "./AuthState";
import { errorEmitter, successEmitter } from "../ToastEmitter";

export const noteContext = createContext(null);

function NoteState({ children }) {
  const { token } = useAuthState();
  const [notes, setNotes] = useState(null);

  const createNotes = async (note) => {
    try {
      const res = await fetch(`${BaseUrls}/note/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(note),
      });

      const data = await res.json();
      if (data.success) {
        successEmitter(data.message);
        return true;
      } else {
        errorEmitter(data.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getPublicNote = async () => {
    try {
      const res = await fetch(`${BaseUrls}/note/public`);
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getYourNote = async () => {
    try {
      const res = await fetch(`${BaseUrls}/note/yournotes`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <noteContext.Provider value={{ notes, createNotes, getPublicNote, getYourNote }}>
      {children}
    </noteContext.Provider>
  );
}

export default NoteState;

export const useNoteState = () => useContext(noteContext);
