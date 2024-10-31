import { Route, Routes, useNavigate } from "react-router-dom";
import LogIn from "./auth/LogIn";
import Home from "./home/Home";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./firebase";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import NavBar from "./components/NavBar";
import { onValue, ref } from "firebase/database";
import { useAuthStore } from "./store/auth.store";

export default function MainRoutes() {
  const navigate = useNavigate()
  const authStore = useAuthStore()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onValue(ref(database, `users/${user.uid}`), (snapshot) => {
          if (snapshot.exists()) {
            authStore.setUser(snapshot.val());
          }
        });
        return navigate("/home");
      } else {
        return navigate("/");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/home" element={<CreateHomeElement route={<Home />} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

interface ICreateHomeElement {
  route: React.ReactNode;
}
function CreateHomeElement({ route }: ICreateHomeElement) {
  return (
    <>
      <NavBar />
      {route}
    </>
  );
}
