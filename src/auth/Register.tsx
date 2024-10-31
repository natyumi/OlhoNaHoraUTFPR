import { useState } from "react";
import logo from "../assets/Logo.svg";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [Ra, setRa] = useState<number>(0);
  const navigate = useNavigate();
  const disabledButton =
    email == "" || course == "" || password == "" || name == "" ? true : false;

  async function submitUser(e: any) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            set(ref(database, "users/" + user.uid), {
              name: name,
              course: course,
              email: user.email,
              Ra: Ra,
              emailVerified: user.emailVerified,
              token: user.refreshToken,
            });
            navigate("/");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex flex-row">
      <div className="p-6 w-full bg-secondary h-[100vh]">
        <h1 className="text-5xl font-medium text-white">
          Se <span className="text-primary">cadastre</span>
        </h1>
        <div className="flex flex-col gap-4 items-center my-[14vh]">
          <Input
            title="Nome da atividade"
            width="w-full max-w-96"
            placeholder="Insira seu nome"
            onChange={(e) => setName(e.target.value)}
            required
            titleColor="text-white"
          />

          <label className="form-control max-w-96 w-full">
            <div className="label">
              <span className="label-text text-white">
                Curso <span className="text-error">*</span>
              </span>
            </div>
            <select
              className="select select-bordered select-sm"
              onChange={(e) => setCourse(e.target.value)}
            >
              <option disabled selected>
                Selecione seu curso
              </option>
              <option value={"Engenharia de computação"}>
                Engenharia de computação
              </option>
              <option value={"Engenharia de software"}>
                Engenharia de software
              </option>
              <option value={"Análise e desenvolvimento de sistemas"}>
                Análise e desenvolvimento de sistemas
              </option>
            </select>
          </label>

          <Input
            title="Email"
            width="w-full max-w-96"
            placeholder="Insira seu email"
            onChange={(e) => setEmail(e.target.value)}
            required
            titleColor="text-white"
            type="email"
          />

          <label className="form-control max-w-96 w-full">
            <div className="label">
              <span className="label-text text-white">
                Senha <span className="text-error">*</span>
              </span>
            </div>
            <div className="input input-bordered flex flex-row items-center justify-between input-sm">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Insira sua senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-ghost btn-circle btn-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoIosEyeOff size={18} />
                ) : (
                  <IoMdEye size={18} />
                )}
              </button>
            </div>
          </label>

          <Input
            title="Código do aluno (R.A)"
            width="w-full max-w-96"
            placeholder="Insira seu R.A"
            onChange={(e) => setRa(e.target.value)}
            titleColor="text-white"
            type="number"
          />

          <div className="max-w-96 w-full flex flex-col items-center">
            <button
              className="btn btn-primary max-w-96 w-full mt-6 disabled:bg-stone-600"
              onClick={submitUser}
              disabled={disabledButton}
            >
              Cadastrar
            </button>
            <p className="text-white text-sm">
              Já possui uma conta?
              <button
                className="btn btn-ghost text-primary p-1 hover:underline"
                onClick={() => navigate("/")}
              >
                Entre!
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-primary p-32 h-[100vh]">
        <div className="my-[20vh]">
          <img
            src={logo}
            width={600}
            height={600}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
}
