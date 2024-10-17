import { useState } from 'react';
import logo from "../assets/Logo.svg";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const disabledButton = ((email == "" || password == "") ? true : false);
  const navigate = useNavigate()

  function logIn() {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/home");
      })
      .catch((error) => {
        setError(error.message)
      })
    setLoading(false);
  }

  return (
    <div className="flex flex-row">
      <div className="p-6 w-full bg-secondary h-[100vh]">
        <h1 className="text-5xl font-medium text-white">
          Entre com sua <span className="text-primary">conta</span>
        </h1>
        <div className="flex flex-col gap-5 items-center my-[20vh]">
          <label className="form-control w-full max-w-96">
            <div className="label">
              <span className="label-text text-white">Email</span>
            </div>
            <input
              type="email"
              placeholder="Insira seu email"
              className="input input-bordered"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="form-control max-w-96 w-full">
            <div className="label">
              <span className="label-text text-white">Senha</span>
            </div>
            <input
              type="password"
              placeholder="Insira sua senha"
              className="input input-bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-ghost text-primary p-1 justify-start hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Esqueceu a senha?
            </button>
          </label>
          <div className='max-w-96 w-full flex flex-col items-center'>
            <button
              className="btn btn-primary max-w-96 w-full disabled:bg-stone-600"
              disabled={disabledButton}
              onClick={logIn}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <p>Entrar</p>
              )}
            </button>
            <p className="text-white text-sm">
              Não possui cadastro?
              <button
                className="btn btn-ghost text-primary p-1 hover:underline"
                onClick={() => navigate("/register")}
              >
                Se cadastre!
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