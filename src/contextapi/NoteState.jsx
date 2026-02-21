import { createContext, useContext, useState } from "react";
import { BaseUrls } from "./../BaseUrls";
import { useAuthState } from "./AuthState";
import { errorEmitter, successEmitter } from "../ToastEmitter";
import { useNavigate } from "react-router-dom";

export const noteContext = createContext(null);

function NoteState({ children }) {
  const { token } = useAuthState();
  const [notes, setNotes] = useState(null);
  const navigate = useNavigate();

  const createNotes = async (note) => {
    try {
      const res = await fetch(`${BaseUrls}/note/create`, {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body:note
      });

      const data = await res.json();
      if (data.success) {
        successEmitter(data.message);
        navigate("/yournotes");
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
  // const createNotes = async (note) => {
  //   try {
  //     const res = await fetch(`${BaseUrls}/note/create`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": token,
  //       },
  //       body: JSON.stringify(note),
  //     });

  //     const data = await res.json();
  //     if (data.success) {
  //       successEmitter(data.message);
  //       navigate("/yournotes")
  //       return true;
  //     } else {
  //       errorEmitter(data.message);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  const getPublicNote = async () => {
    try {
      const res = await fetch(`${BaseUrls}/note/public`);
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setNotes(data.note);
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

  const deleteNote = async (noteid) => {
    try {
      const res = await fetch(`${BaseUrls}/note/delete/${noteid}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setNotes((preNote) => preNote.filter((elm) => elm?._id !== noteid));
        successEmitter(data.message);
        // getYourNote();
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, createNotes, getPublicNote, getYourNote, deleteNote }}
    >
      {children}
    </noteContext.Provider>
  );
}

export default NoteState;

export const useNoteState = () => useContext(noteContext);
