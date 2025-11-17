/**
 * @file Home.jsx
 * @description This component serves as the main landing page of the blog.
 * It fetches all blog posts from the Firebase Realtime Database, sorts them by creation date,
 * and displays them in a paginated list. Users can navigate through pages of blog posts.
 */

import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { get, ref } from "firebase/database";
import HTMLParser from "html-react-parser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import likeIcon from "../assets/icons8-like-50.png";
import { database } from "../firebase";
import RootLayout from "../layout";

window.global = window;

function Home() {
  const [errorMessage, setErrorMessage] = useState("loading");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const convertToHtml = (data) => {
    try {
      const rawContentJSON = data;
      const rawContent = JSON.parse(rawContentJSON);
      const contentState = convertFromRaw(rawContent);
      const html = stateToHTML(contentState);
      return html;
    } catch (error) {
      console.error("error rendering content", error);
      return <p>error loading content </p>;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRef = ref(database, "blogit");
        const snapShot = await get(blogRef);
        if (snapShot.exists()) {
          const blogData = snapShot.val();
          // Convert object to array and attach key as id
          const blogArray = Object.keys(blogData).map((key) => ({
            id: key,
            ...blogData[key],
          }));
          blogArray.sort((a, b) => b.createdAt - a.createdAt);
          setData(blogArray);
          setErrorMessage("");
        } else {
          setErrorMessage("No data found");
        }
      } catch (error) {
        console.error("error loading data", error);
        setErrorMessage("error loading data");
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleBack = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <RootLayout>
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <Link key={item.id} to={`/blog/${item.id}`} state={{ item }}>
              <div className=" bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 m-4  space-y-3 relative overflow-hidden hover:shadow-[0px_0px_5px_violet]">
                <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
                  <div className="absolute bottom-6 left-7 text-white text-2xl">
                    {item.tag}
                  </div>
                </div>
                <div className=" text-violet-400 text-sm ">{item.category}</div>
                <h1 className="font-bold text-xl">{item.title}</h1>
                <div className="text-sm text-zinc-500 leading-6">
                  {HTMLParser(convertToHtml(item.content).slice(0, 200))}{" "}
                  <span className="text-zinc-400">read more</span>
                </div>
                <div className="text-sm font-light flex flex-col  gap-4 text-gray-500 italic">
                  <div className="flex gap-1 justify-between ">
                    <span className=" flex items-center gap-1 justify-center ">
                      <img
                        src={likeIcon}
                        alt="like"
                        className="inline w-4 h-4"
                      />
                      {item.like}
                    </span>
                    <span>$C{item.earn}</span>
                  </div>

                  <div className="flex gap-1 justify-between">
                    {" "}
                    <span>
                      {" "}
                      by{" "}
                      <a
                        className="underline hover:text-violet-300"
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.username}
                      </a>
                    </span>
                    <span>
                      {" "}
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
            {errorMessage}
          </div>
        )}

        {currentData.length > 0 && (
          <div className="flex justify-between mx-5">
            <button
              className="text-white bg-violet-500  p-1 hover:bg-violet-600  hover:shadow-[0px_0px_15px_violet]"
              onClick={handleBack}
              disabled={currentPage === 1}
            >
              {" "}
              back{" "}
            </button>{" "}
            <button
              className="text-white bg-violet-500 p-1 hover:bg-violet-600  hover:shadow-[0px_0px_15px_violet]"
              onClick={handleNext}
              disabled={startIndex + itemsPerPage >= data.length}
            >
              {" "}
              Next{" "}
            </button>
          </div>
        )}
      </RootLayout>
    </>
  );
}

export default Home;
