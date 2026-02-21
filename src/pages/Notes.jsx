import { Link } from "react-router-dom";
import { useNoteState } from "../contextapi/NoteState";
import { useEffect } from "react";
import NoteCard from "./../components/NoteCard";

const Notes = ({ category="private" }) => {
  const { getYourNote, getPublicNote, notes } = useNoteState();

  useEffect(() => {
    if (category=="private") {
      getYourNote();
    } else {
      getPublicNote();
    }
  }, [category]);

  return (
    <>
      <div className="mx-auto pt-12 px-6 max-w-xl text-center">
        <h1 className="text-3xl capitalize pb-10 font-bold dark:text-gray-800 sm:text-5xl">
          Your Notes on cloud <br />
          <strong className="font-bold text-red-700 p-3 sm:block">
            {" "}
            - safe and secure{" "}
          </strong>
        </h1>
        <div className="flex justify-center items-center gap-5">
          <Link
            to="/createnote"
            className="px-6 py-3 text-lg font-semibold rounded dark:bg-rose-600 dark:text-gray-50"
          >
            Create Notes
          </Link>
          <Link
            to="/yournotes"
            className="px-6 py-3 text-lg font-semibold rounded dark:bg-rose-600 dark:text-gray-50"
          >
            Your Notes
          </Link>
        </div>
      </div>
      <div className="px-6 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <h1 className="text-3xl pb-10 font-bold leading-none max-md:text-xl">
          {category=="private" ? "Your" : "Public"}{" "}
          <span className="text-rose-500">Notes</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 inline"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </h1>
        {notes?.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
            {notes?.map((elm, idx) => {
              return (
                <NoteCard
                  title={elm?.title}
                  description={elm?.description}
                  tag={elm?.tag}
                  isPrivate={elm?.isPrivate}
                  updatedAt={elm?.updatedAt}
                  image={elm?.image}
                  userId={elm?.createdBy?._id}
                  category={category}
                  noteId={elm?._id}
                />
              );
            })}
          </div>
        ) : (
          <div>
            <h1 className="text-center my-10">No Notes Available</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
