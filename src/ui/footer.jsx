export default function Footer() {
  return (
    <div className="p-2 justify-between md:p-8 font-italic bg-violet-400 text-center text-white flex cursor-default  mt-8 justify-around">
      <div>
        <div className="hover:bg-violet-500 mb-1">
          <a href="./blog/9">about</a>
        </div>
        <div className="hover:bg-violet-500 mb-1">
          <a href="./blog/10">meaning of tag</a>
        </div>
        <div className="hover:bg-violet-500 mb-1">
          <a href="./blog/11">meaning of pin</a>
        </div>
        <div className="hover:bg-violet-500 mb-1">
          <a href="./blog/10">how to compose message</a>
        </div>
      </div>
      <div>
        <div className="hover:bg-violet-500 mb-1">how to earn</div>
        <div className="hover:bg-violet-500 mb-1">how to withraw</div>
      </div>
      <div>
        <div className="hover:bg-violet-500 mb-1">
          <a href="./blog/12">terms and conditions</a>
        </div>
        <div className="hover:bg-violet-500 mb-1">how to edit</div>
        <div className="hover:bg-violet-500 mb-1">how to delete</div>
      </div>
    </div>
  );
}
