import { Route, Routes } from "react-router-dom"
import Signup from "./pages/Singup"
import Signin from "./pages/Signin"
import Blog from "./pages/Blog"
import Blogs from "./pages/Blogs"
import Publish from "./pages/Publish"


function App() {


  return (
    <div className="w-full h-screen">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />} />
      </Routes>
    </div>
  )
}

export default App
