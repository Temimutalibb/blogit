import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="p-2 mt-2  flex-wrap  md:p-8 font-italic bg-violet-400 text-center text-white flex cursor-default  mt-8 justify-around">
      <div className="mb-3">
        <div className="hover:bg-violet-500 mb-1">
          <Link to="/blog/9">about</Link>
        </div>
        <div className="hover:bg-violet-500 mb-1">
          <Link to="/blog/10">meaning of tag</Link>
        </div>
        <div className="hover:bg-violet-500 mb-1">
          <Link to="/blog/11">meaning of pin</Link>
        </div>
        <div className="hover:bg-violet-500 mb-1">
          <Link to="/blog/10">how to compose message</Link>
        </div>
      </div>
      <div className="mb-3">
        <div className="hover:bg-violet-500 mb-1">
          <Link to="/blog/15">how to earn</Link>
        </div>
        <div className="hover:bg-violet-500 mb-1">
          <Link to="/blog/15">how to withdraw</Link>
        </div>
      </div>
      <div className="mb-3">
        <div className="hover:bg-violet-500 mb-1">
          <Link to="/blog/12">terms and conditions</Link>
        </div>
        <div className="hover:bg-violet-500 mb-1">
          <Link to="/blog/15">how to edit</Link>
        </div>
        <div className="hover:bg-violet-500 mb-1">
          <Link to="/blog/15">how to delete</Link>
        </div>
      </div>
    </div>
  );
}
