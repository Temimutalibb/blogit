import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Blog from "./components/blog";
import Category from "./components/category";
import Home from "./components/home";
window.global = window;

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
