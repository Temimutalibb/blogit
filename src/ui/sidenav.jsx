import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { database } from "../firebase";

export default function SideNav() {
  const [showAll, setShowAll] = useState(false);
  const toggleShow = () => setShowAll(!showAll);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("loading");

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

  const category = [
    "Technology",
    "Business",
    "Education",
    "Entertainment",
    "Food_and_Drink",
    "Finance",
    "Marketing",
    "Science",
    "DIY_and _Crafts",
    "News_and_Opinion",
    "Parentin",
    "Photography",
    "Technology_Review",
    "Programming",
    "Web_3",
    "Tech",
    "Crypto",
    "Life_style",
    "Inspiration",
    "poem",
    "Quote",
    "Others",
  ];
  const trending = data.sort((a, b) => b.click - a.click).slice(0, 5);

  const newPost = data
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);
  return (
    <>
      <div>
        <h1 className="font-bold mb-2 text-center text-violet-500 text-xl">
          CATEGORIES
        </h1>
        {category.slice(0, showAll ? category.length : 5).map((item, index) => (
          <Link to={`/category/${item}`} key={index}>
            <p className="text-sm mb-3 text-center  overflow-hidden font-bold text-zinc-500 leading-6 cursor-default hover:text-violet-300">
              {item}
            </p>
          </Link>
        ))}

        <div
          onClick={toggleShow}
          className="text-center self-center mx-auto w-1/2 cursor-pointer shadow-[0px_0px_15px_rgba(0,0,0,0.09)] "
        >
          {showAll ? "Show less" : "Show more"}
        </div>
      </div>

      <div>
        <h1 className="font-bold mb-2 text-center text-violet-500 text-xl">
          TRENDING
        </h1>
        {trending ? (
          trending.map((item) => (
            <Link key={item.id} to={`/blog/${item.id}`}>
              <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
                {item.title}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
            {errorMessage}
          </div>
        )}
        <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
          {errorMessage}
        </div>
      </div>

      <div>
        <h1 className="font-bold mb-2 text-center text-violet-500 text-xl">
          NEW POST
        </h1>
        {newPost ? (
          newPost.map((item) => (
            <Link key={item.id} to={`/blog/${item.id}`}>
              <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
                {item.title}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
            {errorMessage}
          </div>
        )}
        <div className="text-sm mb-3 text-center cursor-default overflow-hidden font-bold text-zinc-500 cursor-default leading-6 hover:text-violet-300">
          {errorMessage}
        </div>
      </div>
    </>
  );
}
