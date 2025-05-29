import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { get, ref } from "firebase/database";
import HTMLParser from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import likeIcon from "../assets/icons8-like-50.png";
import { database } from "../firebase";
import RootLayout from "../layout";
import ShareButton from "../ui/sharebutton";
window.global = window;

function Blog() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
    setLoading(true); // Start loading
    const fetchData = async () => {
      try {
        const blogRef = ref(database, `blogit/${id}`);
        const snapShot = await get(blogRef);
        if (snapShot.exists()) {
          setData(snapShot.val());
          setErrorMessage("");
        } else {
          setErrorMessage("No data found");
        }
      } catch (error) {
        console.error("error loading data", error);
        setErrorMessage("error loading data");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, [id]);

  if (!id)
    return (
      <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
        No data found
      </div>
    );

  if (loading)
    return (
      <div className="text-sm mb-3 text-center font-bold text-zinc-500 leading-6">
        Loading...
      </div>
    );

  return (
    <>
      <RootLayout>
        {data && data.title ? (
          <div className="bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 m-4 space-y-3 relative overflow-hidden">
            <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7">
              <div className="absolute bottom-6 left-7 text-white text-2xl">
                {data.tag}
              </div>
            </div>
            <div className="text-violet-400 text-sm">{data.category}</div>
            <h1 className="font-bold text-xl">{data.title}</h1>
            <div className="text-sm text-zinc-900 leading-6">
              {HTMLParser(convertToHtml(data.content))}
            </div>
            <div className="text-sm font-light flex justify-between text-gray-500 italic">
              <span>
                by{" "}
                <a
                  className="underline"
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.username}
                </a>
              </span>
              <span>
                {" "}
                {data.createdAt
                  ? new Date(data.createdAt).toLocaleString()
                  : ""}
              </span>
              <span>
                <ShareButton
                  url={``}
                  text={`https://blogit.mutalibb.xyz/${id}..  ${twitterShare(
                    data.content
                  )}`}
                />
              </span>
              <span className=" flex items-center gap-1 justify-center ">
                <img src={likeIcon} alt="like" className="inline w-4 h-4" />
                {data.like}
              </span>
              <span>$C{data.earn}</span>
            </div>
          </div>
        ) : (
          <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
            {errorMessage || "No data found"}
          </div>
        )}
      </RootLayout>
    </>
  );
}

export default Blog;
