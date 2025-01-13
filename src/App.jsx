import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Blog from "./components/blog";
import Category from "./components/category";
import Home from "./components/home";
window.global = window;
export const sever = "https://blogitserver.vercel.app/`";
//export const server = "http://localhost:4000/";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blog/:id" element={<Blog />} />
          <Route path="category/:id" element={<Category />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
