import { useState } from 'react';
import logo from "../assets/Logo.svg";
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  const disabledButton = ((email == "") ? true : false);

  function resetPassword() {
    setLoading(true)
    setEmailSent(false)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true)
      })
      .catch((error) => {
        console.log(error)
        setEmailSent(false)
      })
    setLoading(false);
  }

  return (
    <div className="flex flex-row">
      <div className="p-6 w-full bg-secondary h-[100vh]">
        <h1 className="text-5xl font-medium text-white">
          Altere sua <span className="text-primary">senha</span>
        </h1>
        <div className="flex flex-col gap-5 items-center my-[30vh]">
          {emailSent ? (
            <div>
              <p className='text-white text-lg'>
                Um email de redefinição de senha foi enviado para sua caixa de entrada
              </p>
              <button
                className="btn btn-ghost text-primary p-1 hover:underline"
                onClick={() => navigate("/")}
              >
                <IoArrowBack /> Voltar para tela inicial
              </button>
            </div>
          ) : (
            <>
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

              <div className='max-w-96 w-full flex flex-col items-center'>
                <button
                  className="btn btn-primary max-w-96 w-full disabled:bg-stone-600"
                  disabled={disabledButton}
                  onClick={resetPassword}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <p>Alterar senha</p>
                  )}
                </button>
                <button
                  className="btn btn-ghost text-primary p-1 hover:underline"
                  onClick={() => navigate("/")}
                >
                  <IoArrowBack /> Voltar
                </button>
              </div>
            </>
          )}
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