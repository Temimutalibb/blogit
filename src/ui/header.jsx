import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="w-[100%] h-20 justify-around mb-8 mt-0 bg-white flex items-center shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-3 overflow-hidden">
        <div className="w-1/4 flex justify-start">
          <Link to="/">
            <img src="/MdiLightRss.svg" className="w-10" alt="blogit" />
          </Link>
        </div>
        <div className="w-1/4 text-violet-500 font-bold text-lg">
          <Link to="/">blogIT</Link>
        </div>
        <div className="w-1/4 flex justify-between justify-end text-violet-500 ">
          <div>
            <a href="https://roko.mutalibb.xyz/">compose</a>
          </div>
          <div className="hidden md:block">
            <Link to="/blog/-OROv6hUpWBlopCvR6qB">terms</Link>
          </div>
          <div className="hidden md:block">
            <Link to="blog/-ORR-M9M9FT-pJq5Xgl_">about</Link>
          </div>
        </div>
      </div>
    </>
  );
}
