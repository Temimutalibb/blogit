import axios from "axios";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import HTMLParser from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../App";
import RootLayout from "../layout";
import ShareButton from "../ui/sharebutton";

window.global = window;

function Blog() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("loading");
  const [editDisplay, setEditDisplay] = useState(false);
  const [editPin, setEditPin] = useState("");
  const [contentId, setContentId] = useState("");
  const [contentTag, setContentTag] = useState("");

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

  //function to share on twitter
  const twitterShare = (data) => {
    const rawContentJSON = data;
    const rawContent = JSON.parse(rawContentJSON);
    const contentState = convertFromRaw(rawContent);
    const plainText = contentState.getPlainText();
    return plainText;
  };

  useEffect(() => {
    try {
      axios.post(`https://blogitserver.vercel.app/click`, {
        id: id,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

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

  const filterData = data.filter((item) => item.id == id);

  const handleDelete = () => {
    try {
      axios.post(`${server}delete`, {
        id: contentId,
        tag: contentTag,
        pin: editPin,
      });
      setEditDisplay(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditButton = (id, tag) => {
    setEditDisplay(true);
    setContentId(id);
    setContentTag(tag);
  };

  const handlePin = (event) => {
    setEditPin(event.target.value);
  };

  return (
    <>
      <RootLayout>
        {filterData ? (
          filterData.map((item) => (
            <div
              key={item.id}
              className=" bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 m-4  space-y-3 relative overflow-hidden"
            >
              <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
                <div className="absolute bottom-6 left-7 text-white text-2xl">
                  {item.tag}
                </div>
              </div>
              <div className=" text-violet-400 text-sm ">{item.category}</div>
              <h1 className="font-bold text-xl">{item.title}</h1>
              <div className="text-sm text-zinc-500 leading-6">
                {HTMLParser(convertToHtml(item.content))}
              </div>
              <div className="text-sm font-light flex justify-between text-gray-500 italic">
                <span>
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
                <span>
                  <ShareButton
                    url={``}
                    text={`https://blogit.mutalibb.xyz/${
                      item.id
                    }..  ${twitterShare(item.content)}`}
                  />
                </span>

                <span>
                  <button
                    onClick={() => handleEditButton(item.id, item.tag)}
                    className="font-medium bg-gray-100 p-1"
                  >
                    edit
                  </button>
                </span>

                <span>${item.earn}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
            {"error loading data"}
          </div>
        )}
        <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
          {errorMessage}
        </div>

        {editDisplay && (
          <div className=" bg-white w-[30%] shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 m-12 h-auto  space-y-3 absolute  bottom-9 right-0 left-[25%]  overflow-hidden">
            <div className="bg-white opacity-60  cursor-pointer disabled text-center font-medium shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-5 m-1 h-5 pb-9  overflow-hidden">
              <input
                type="text"
                placeholder="input pin "
                value={editPin}
                onChange={handlePin}
              />
            </div>
            <div className=" bg-white opacity-60  cursor-not-allowed disabled text-center font-medium shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-5 m-1 h-5 pb-9  overflow-hidden">
              edit
            </div>
            <div
              onClick={handleDelete}
              className=" bg-white  cursor-default text-center font-medium shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-5 m-1 h-5 pb-9  overflow-hidden"
            >
              delete
            </div>
            <div
              className=" bg-white opacity-60 text-center cursor-not-allowed
          font-medium shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-5 m-1 h-5 pb-9  overflow-hidden"
            >
              withdraw
            </div>
            <div
              onClick={() => setEditDisplay(false)}
              className=" bg-white text-red-500  cursor-default text-center font-medium shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-5 m-1 h-5 pb-9  overflow-hidden"
            >
              close
            </div>
          </div>
        )}
      </RootLayout>
    </>
  );
}

export default Blog;
