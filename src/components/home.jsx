import axios from "axios";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import HTMLParser from "html-react-parser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        const response = await axios.get(
          `https://blogitserver.vercel.app/data`
        );
        setData(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error(error);
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

  const handleClick = async (id) => {
    try {
      axios.post(`https://blogitserver.vercel.app/click`, { id: id });
    } catch (error) {
      console.error(error);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <RootLayout>
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <Link
              key={item.id}
              to={`/blog/${item.id}`}
              onClick={() => handleClick(item.id)}
            >
              <div className=" bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 m-4  space-y-3 relative overflow-hidden">
                <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
                  <div className="absolute bottom-6 left-7 text-white text-2xl">
                    {item.tag}
                  </div>
                </div>
                <div className=" text-violet-400 text-sm ">{item.category}</div>
                <h1 className="font-bold text-xl">{item.title}</h1>
                <div className="text-sm text-zinc-500 leading-6">
                  {HTMLParser(convertToHtml(item.content).slice(0, 100))}....
                </div>
                <div className="text-sm font-light flex justify-between text-gray-500 italic">
                  <span>
                    {" "}
                    by{" "}
                    <a
                      className="underline"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.username}
                    </a>
                  </span>

                  <span>${item.earn}</span>
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
              className="text-white bg-violet-500  shadow-[0px_0px_15px_violet] p-1"
              onClick={handleBack}
              disabled={currentPage === 1}
            >
              {" "}
              back{" "}
            </button>{" "}
            <button
              className="text-white bg-violet-500  shadow-[0px_0px_15px_violet] p-1"
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
