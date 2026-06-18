import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contactus from "./pages/Contactus"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Categories from "./pages/Categories"
import Services from "./pages/Services"
import SubCategoryByCategory from "./pages/SubCategoryByCategory"
import ServiceByCategory from "./pages/ServiceByCategory"
import ServiceDetails from "./pages/ServiceDetails"
import Profile from "./pages/Profile"
import MyBookings from "./pages/MyBookings"
import MyInquiries from "./pages/MyInquiries"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/SubCategoryByCategory/:id" element={<SubCategoryByCategory />} />
          <Route path="/ServiceByCategory/:id" element={<ServiceByCategory />} />
          <Route path="/ServiceDetails/:id" element={<ServiceDetails />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/mybookings/:user_id" element={<MyBookings />} />
          <Route path="/myinquiries/:user_id" element={<MyInquiries />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
