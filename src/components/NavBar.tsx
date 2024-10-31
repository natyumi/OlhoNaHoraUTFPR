import { FaHome } from "react-icons/fa";
import logo2 from "../assets/Logo2.svg";
import { IoIosSchool } from "react-icons/io";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function NavBar() {
  const navigate = useNavigate();
  function signOUT() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="navbar bg-primary px-10 flex flex-row justify-between">
      <img src={logo2} width={200} height={200} alt="Picture of the author" />
      <div className="flex flex-row gap-10">
        <button className="btn btn-ghost hover:underline btn-md p-0 text-base">
          <FaHome /> Início
        </button>
        <button className="btn btn-ghost hover:underline btn-md p-0 text-base">
          <IoIosSchool /> Projetos
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-secondary btn-lg font-medium"
          >
            <span>NY</span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg mt-1"
          >
            <li>
              <p className="font-medium text-base">Natália Yumi</p>
            </li>
            <hr />
            <li className="mt-2">
              <a>Perfil</a>
            </li>
            <li className="mt-2">
              <a onClick={signOUT}>Sair</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
