import { useState } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { IoIosEyeOff, IoMdEye } from 'react-icons/io'
import { AiFillCloseCircle } from 'react-icons/ai'

interface IInput {
  title?: string
  titleColor?: string
  placeholder?: string
  type?: string
  width?: string
  value?: string | number
  onChange: (e: any) => void
  required?: boolean
  inputSize?: string
  password?: boolean
  setInvalidPassword?: (invalid: boolean) => void
  passwordPadding?: string
  passwordText?: string
}

export default function Input({
  title,
  placeholder = '',
  type = 'text',
  width = 'w-full',
  onChange,
  value,
  required,
  inputSize = 'input-sm',
  titleColor = 'text-secondary',
  password,
  setInvalidPassword,
  passwordPadding,
  passwordText
}: IInput) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [passwordProblems, setPasswordProblems] = useState<{
    hasMinLength: boolean
    hasUpperCase: boolean
    hasNumber: boolean
    hasSymbols: boolean
  }>({
    hasMinLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSymbols: false,
  })

  const validatePassword = (pwd: string) => {
    let problems = {
      hasMinLength: false,
      hasUpperCase: false,
      hasNumber: false,
      hasSymbols: false,
    }

    problems.hasMinLength = pwd.length < 6 ? false : true
    problems.hasUpperCase = !/[A-Z]/.test(pwd) ? false : true
    problems.hasNumber = !/[0-9]/.test(pwd) ? false : true
    problems.hasSymbols = !/[!@#$%^&*(),.?":{}|<>]/.test(pwd) ? false : true
    setPasswordProblems(problems)
    setInvalidPassword?.(Object.values(problems).some(value => !value))
  }

  const handleChangePassword = (pwd: string) => {
    validatePassword(pwd)
  }

  return (
    <div className={`${width}`}>
      {title && (
        <p className={`text-sm font-medium ${titleColor} mb-2`}>
          {title} {required && <span className="text-error">*</span>}
        </p>
      )}
      {password ? (
        <div className={`dropdown dropdown-right ${width}`}>
          <div
            className={`border rounded-lg flex flex-row items-center justify-between bg-white ${passwordPadding}`}
            role="button"
            tabIndex={0}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              onChange={(e) => (
                handleChangePassword(e.target.value), onChange(e)
              )}
              className={`p-2 input input-xs ${width} border-none ${passwordText}`}
            />
            <button
              className="btn btn-ghost btn-circle btn-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoIosEyeOff size={18} /> : <IoMdEye size={18} />}
            </button>
          </div>
          <ul
            className="menu dropdown-content bg-base-100 rounded-box z-[1] w-96 p-2 shadow ml-2"
            tabIndex={0}
          >
            {[
              {
                check: passwordProblems.hasMinLength,
                message: 'A senha deve ter pelo menos 6 caracteres',
              },
              {
                check: passwordProblems.hasUpperCase,
                message: 'A senha deve conter pelo menos uma letra maiúscula',
              },
              {
                check: passwordProblems.hasNumber,
                message: 'A senha deve conter pelo menos um número',
              },
              {
                check: passwordProblems.hasSymbols,
                message: 'A senha deve conter pelo menos um caractere especial',
              },
            ].map(({ check, message }, index) => (
              <div key={index}>
                <p
                  className={`${
                    check ? 'text-green-500' : 'text-[#991B1B]'
                  } flex flex-row items-center gap-2 text-sm mb-2`}
                >
                  {check ? (
                    <FaRegCheckCircle size={18} />
                  ) : (
                    <AiFillCloseCircle size={18} />
                  )}
                  {message}
                </p>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`input ${inputSize} w-full ${width} input-bordered border-gray-200`}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  )
}
