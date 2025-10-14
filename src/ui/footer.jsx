/**
 * @file footer.jsx
 * @description This component renders the footer for the application, containing useful links and information.
 */
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="p-2 mt-2  flex-wrap  md:p-8 font-italic bg-violet-400 text-center text-white flex cursor-default  mt-8 justify-around">
      <div className="mb-3">
        <div className="hover:bg-violet-500 mb-1  hover:p-1">
          <Link to="/blog/-ORR-M9M9FT-pJq5Xgl_">about</Link>
        </div>

        <div className="hover:bg-violet-500 mb-1 hover:p-1">
          <Link to="/blog/-ORQtBffyPQT6paoVZAw">how to compose message</Link>
        </div>
      </div>
      <div className="mb-3">
        <div className="hover:bg-violet-500 mb-1 hover:p-1">
          <Link to="/blog/-ORQzWaaqS3dbjmu46Hx">how to earn</Link>
        </div>
        <div className="hover:bg-violet-500 mb-1 hover:p-1" >
          <Link to="/blog/-ORQzWaaqS3dbjmu46Hx">how to withdraw</Link>
        </div>
      </div>
      <div className="mb-3">
        <div className="hover:bg-violet-500 mb-1 hover:p-1">
          <Link to="/blog/-OROv6hUpWBlopCvR6qB">terms and conditions</Link>
        </div>

        <div className="hover:bg-violet-500 mb-1 hover:p-1">
          <Link to="/blog/-ORQzWaaqS3dbjmu46Hx">how to delete</Link>
        </div>
      </div>
    </div>
  );
}
