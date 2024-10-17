import { Route, Routes, useNavigate } from "react-router-dom";
import LogIn from "./auth/LogIn";
import Home from "./home/Home";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";

export default function MainRoutes() {
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return navigate("/home")
      } else {
       return navigate("/")
      }
    });
  }, []);
  
  return (
    <Routes>
      <Route path="/" element={<LogIn/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
  )
}