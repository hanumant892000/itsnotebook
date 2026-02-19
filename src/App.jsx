import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Notes from "./pages/Notes";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import CreateNote from "./pages/CreateNote";
import { useAuthState } from "./contextapi/AuthState";
import Loader from "./pages/Loader";
import "./App.css";
import AuthProtector from "./components/AuthProtector";

function App() {
  const { getProfileFunc, fetching } = useAuthState();

  useEffect(() => {
    getProfileFunc();
  }, []);

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route
          path="/createnote"
          element={
            <AuthProtector>
              <CreateNote />
            </AuthProtector>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
