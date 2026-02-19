import React from "react";
import { Box, Drawer } from "@mui/material";
import {
  BookHeart,
  LogOut,
  Notebook,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { useAuthState } from "../contextapi/AuthState";
import { Link } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  const { isLogin, logoutHandler, profile } = useAuthState();

  return (
    <>
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <Box sx={{ width: 300 }} role="presentation">
          <div className="h-full w-full py-12">
            <div className="flex flex-col items-center">
              <img
                className="h-25 w-25 rounded-full"
                src={`${profile?.avatar || "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"}`}
                alt="loading..."
              />
              <h1 className="my-3 text-3xl capitalize font-bold">
                {profile?.name}
              </h1>
              <p>{profile?.email}</p>
            </div>

            <ul className="my-5 leading-10">
              <Link to="/yournotes"
                className="hover:bg-gray-200 px-5 cursor-pointer flex items-center gap-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                <BookHeart size={"18px"} /> Your notes
              </Link>
              <Link
                to="/notes"
                className="hover:bg-gray-200 px-5 cursor-pointer flex items-center gap-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                <Notebook size={"18px"} /> Public notes
              </Link>
              <Link
                to="profile"
                className="hover:bg-gray-200 px-5 cursor-pointer flex items-center gap-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                <UserRoundCog size={"18px"} /> Profile
              </Link>
              <li
                className="hover:bg-gray-200 px-5 cursor-pointer flex items-center gap-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                <Settings size={"18px"} /> Setting
              </li>
            </ul>

            <div className="flex justify-center">
              {/* <button
                  type="button"
                  className="py-2 px-4 flex justify-center items-center  bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 focus:ring-offset-rose-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md disabled:bg-rose-300"
                  disabled={loader}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="mr-2 animate-spin"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                  </svg>
                  loading
                </button> */}

              <button
                className="absolute bottom-5 px-6 py-2 font-semibold rounded dark:bg-rose-600 dark:text-gray-50 flex items-center gap-2"
                onClick={() => {
                  logoutHandler();
                  setOpen(false);
                }}
              >
                <LogOut size={"20px"} /> Logout
              </button>
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
