import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import HTMLParser from "html-react-parser";

import { useLocation } from "react-router-dom";
import RootLayout from "../layout";
import ShareButton from "../ui/sharebutton";
window.global = window;

function Blog() {
  const location = useLocation();
  const item = location.state?.item;

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

  /*useEffect(() => {
    try {
      axios.post(`https://blogitserver.vercel.app/click`, {
        id: id,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
*/
  /*useEffect(() => {
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
*/
  if (!item)
    return (
      <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
        No data found
      </div>
    );

  return (
    <>
      <RootLayout>
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
          <div className="text-sm text-zinc-900 leading-6">
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
                text={`https://blogit.mutalibb.xyz/${item.id}..  ${twitterShare(
                  item.content
                )}`}
              />
            </span>
            <span>{item.like}</span>
            <span>$C{item.earn}</span>
          </div>
        </div>
      </RootLayout>
    </>
  );
}

export default Blog;
